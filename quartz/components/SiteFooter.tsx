import { joinSegments, pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { site } from "../site"

/**
 * SiteFooter: copyright line, contact links and a small credit.
 */
const footerStyle = `
.site-footer {
  margin: 3.5rem 0 2rem 0;
  padding-top: 1.2rem;
  border-top: 1px solid var(--lightgray);
  font-size: 0.92rem;
  color: var(--gray);
}

.site-footer p {
  margin: 0.25rem 0;
  color: var(--gray);
  line-height: 1.6;
}

.site-footer a {
  color: var(--darkgray);
  font-weight: 500;
  text-decoration: none;
}

.site-footer a:hover {
  color: var(--secondary);
}

.site-footer .site-footer-credit {
  font-size: 0.85rem;
  margin-top: 0.6rem;
}
`

export default (() => {
  const SiteFooter: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const baseDir = pathToRoot(fileData.slug!)
    return (
      <footer class="site-footer">
        <p>
          &copy; {year} {site.name} &middot; {site.department}, {site.affiliation}
        </p>
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a> &middot;{" "}
          <a href={joinSegments(baseDir, site.cvPdf)}>CV (PDF)</a> &middot;{" "}
          <a href={site.linkedin}>LinkedIn</a> &middot; <a href={site.github}>GitHub</a>
        </p>
        <p class="site-footer-credit">
          Built with <a href="https://quartz.jzhao.xyz/">Quartz</a> and hosted on GitHub Pages.
        </p>
      </footer>
    )
  }

  SiteFooter.css = footerStyle
  return SiteFooter
}) satisfies QuartzComponentConstructor
