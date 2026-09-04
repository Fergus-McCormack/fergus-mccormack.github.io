import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import SeoHead from "./quartz/components/SeoHead"
import SiteNav from "./quartz/components/SiteNav"
import SiteFooter from "./quartz/components/SiteFooter"

/**
 * Page layout for fergus-mccormack.github.io
 *
 * A single centred column: custom <head> with SEO metadata, a top
 * navigation bar, the page content, and a footer. Quartz's sidebars
 * (explorer, graph, table of contents, backlinks) are left empty and
 * hidden in quartz/styles/custom.scss.
 */

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: SeoHead(),
  header: [SiteNav()],
  afterBody: [],
  footer: SiteFooter(),
}

// components for pages that display a single page (all pages on this site)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [],
  left: [],
  right: [],
}

// components for pages that display lists of pages (unused, kept for Quartz internals)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [],
  right: [],
}
