import { joinSegments, pathToRoot } from "../util/path"
import { concatenateResources } from "../util/resources"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import DarkmodeConstructor from "./Darkmode"
// @ts-ignore
import themeScript from "./scripts/sitetheme.inline"
import { site } from "../site"

/**
 * SiteNav: name on the left, page links plus the light/dark toggle on the
 * right. The link list is defined in quartz/site.ts (site.nav).
 */
const navStyle = `
.site-nav {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.6rem 1.5rem;
  width: 100%;
  padding: 1.6rem 0 0.9rem 0;
  border-bottom: 1px solid var(--lightgray);
}

.site-nav-name {
  font-family: var(--headerFont);
  font-size: 1.45rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--dark);
  text-decoration: none;
}

.site-nav-name:hover {
  color: var(--secondary);
}

.site-nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 1.35rem;
}

.site-nav-links li {
  margin: 0;
  line-height: 1;
}

.site-nav-links a {
  font-size: 0.98rem;
  font-weight: 500;
  color: var(--darkgray);
  text-decoration: none;
  padding-bottom: 0.2rem;
  border-bottom: 2px solid transparent;
}

.site-nav-links a:hover {
  color: var(--secondary);
}

.site-nav-links a.active {
  color: var(--secondary);
  border-bottom-color: var(--secondary);
}

.site-nav-toggle {
  display: flex;
  align-items: center;
  padding-left: 0.2rem;
}

.site-nav-toggle .darkmode {
  width: 18px;
  height: 18px;
}

.site-nav-toggle .darkmode svg {
  width: 18px;
  height: 18px;
  top: calc(50% - 9px);
  fill: var(--gray);
}

.site-nav-toggle .darkmode:hover svg {
  fill: var(--secondary);
}

@media all and (max-width: 800px) {
  .site-nav {
    padding-top: 1.1rem;
  }
  .site-nav-links {
    gap: 1rem;
  }
}
`

export default (() => {
  const Darkmode = DarkmodeConstructor()

  const SiteNav: QuartzComponent = (props: QuartzComponentProps) => {
    const slug = props.fileData.slug!
    const baseDir = pathToRoot(slug)

    return (
      <nav class="site-nav" aria-label="Main navigation">
        <a class="site-nav-name" href={baseDir}>
          {site.name}
        </a>
        <ul class="site-nav-links">
          {site.nav.map((item) => {
            const href = item.slug === "" ? baseDir : joinSegments(baseDir, item.slug)
            const active = item.slug === "" ? slug === "index" : slug === item.slug
            return (
              <li>
                <a
                  href={href}
                  class={active ? "active" : undefined}
                  aria-current={active ? "page" : undefined}
                >
                  {item.text}
                </a>
              </li>
            )
          })}
          <li class="site-nav-toggle">
            <Darkmode {...props} />
          </li>
        </ul>
      </nav>
    )
  }

  // Forward the nested Darkmode button's stylesheet so Quartz bundles it (it
  // only collects resources from top-level components). The theme script is
  // our own (light by default) rather than Quartz's (dark by default).
  SiteNav.css = concatenateResources(navStyle, Darkmode.css)
  SiteNav.beforeDOMLoaded = themeScript
  return SiteNav
}) satisfies QuartzComponentConstructor
