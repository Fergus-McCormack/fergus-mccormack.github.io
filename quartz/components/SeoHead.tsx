import { i18n } from "../i18n"
import { joinSegments, pathToRoot } from "../util/path"
import { CSSResourceToStyleElement, JSResourceToScriptElement } from "../util/resources"
import { googleFontHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { unescapeHTML } from "../util/escape"
import { site } from "../site"

/**
 * SeoHead: replacement for Quartz's default Head component.
 *
 * Adds what a personal academic site needs to rank for a name search:
 *  - a descriptive <title> that leads with the name on the home page,
 *  - meta description / author / robots, canonical URL,
 *  - Open Graph + Twitter cards with a static social image,
 *  - schema.org JSON-LD (Person, WebSite, ProfilePage, ScholarlyArticle),
 *  - an optional Google Search Console verification tag (quartz/site.ts).
 */
export default (() => {
  const SeoHead: QuartzComponent = ({ cfg, fileData, externalResources }: QuartzComponentProps) => {
    const slug = fileData.slug!
    const isHome = slug === "index"
    const is404 = slug === "404"

    const pageName = fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
    // Home: "Fergus McCormack | PhD Candidate in Economics, University of Cambridge"
    // Other pages: "Research | Fergus McCormack"
    const title = isHome
      ? `${site.name} | ${site.jobTitle}, ${site.affiliation}`
      : `${pageName} | ${site.name}`
    const description =
      fileData.frontmatter?.description ??
      unescapeHTML(fileData.description?.trim() ?? site.description)

    const { css, js, additionalHead } = externalResources

    const baseDir = is404 ? "/" : pathToRoot(slug)
    const iconPath = joinSegments(baseDir, "static/icon.png")
    const canonical = isHome || is404 ? `${site.url}/` : `${site.url}/${slug}`
    const ogImageAlt = `${site.name}, ${site.jobTitle}, ${site.affiliation}`

    // ---- schema.org structured data -------------------------------------
    const personId = `${site.url}/#person`
    const websiteId = `${site.url}/#website`

    const person = {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      givenName: site.givenName,
      familyName: site.familyName,
      jobTitle: site.jobTitle,
      email: `mailto:${site.email}`,
      url: `${site.url}/`,
      image: site.image,
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: site.affiliation,
        url: site.affiliationUrl,
        department: {
          "@type": "Organization",
          name: site.department,
          url: site.departmentUrl,
        },
      },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "University of Cambridge" },
        { "@type": "CollegeOrUniversity", name: "University of Edinburgh" },
      ],
      knowsAbout: site.knowsAbout,
      sameAs: site.sameAs,
    }

    const website = {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${site.url}/`,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": personId },
    }

    const webpage = {
      "@type": isHome ? "ProfilePage" : "WebPage",
      "@id": canonical,
      url: canonical,
      name: title,
      description: description,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      ...(isHome ? { mainEntity: { "@id": personId } } : {}),
    }

    const graph: object[] = [person, website, webpage]

    if (slug === "research") {
      for (const paper of site.papers) {
        graph.push({
          "@type": "ScholarlyArticle",
          headline: paper.name,
          name: paper.name,
          abstract: paper.description,
          genre: paper.genre,
          inLanguage: "en",
          author: paper.authors.map((a) =>
            a === site.name ? { "@id": personId } : { "@type": "Person", name: a },
          ),
          ...(paper.url
            ? {
                url: paper.url,
                encoding: {
                  "@type": "MediaObject",
                  contentUrl: paper.url,
                  encodingFormat: "application/pdf",
                },
              }
            : {}),
          ...(paper.date ? { datePublished: paper.date } : {}),
        })
      }
    }

    // "<" is escaped so the JSON can never terminate the script element early.
    const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
      /</g,
      "\\u003c",
    )

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
          </>
        )}

        <meta name="description" content={description} />
        <meta name="author" content={site.name} />
        <meta
          name="robots"
          content={is404 ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"}
        />
        {site.googleSiteVerification && (
          <meta name="google-site-verification" content={site.googleSiteVerification} />
        )}
        <link rel="canonical" href={canonical} />

        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content={isHome ? "profile" : "website"} />
        {isHome && (
          <>
            <meta property="profile:first_name" content={site.givenName} />
            <meta property="profile:last_name" content={site.familyName} />
          </>
        )}
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={site.ogImage} />
        <meta property="og:image:secure_url" content={site.ogImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={ogImageAlt} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={site.ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />

        <link rel="icon" href={iconPath} type="image/png" />
        <link rel="apple-touch-icon" href={iconPath} />
        <meta name="theme-color" content="#172542" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

        {css.map((resource) => CSSResourceToStyleElement(resource, true))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
        {additionalHead.map((resource) => {
          if (typeof resource === "function") {
            return resource(fileData)
          } else {
            return resource
          }
        })}
      </head>
    )
  }

  return SeoHead
}) satisfies QuartzComponentConstructor
