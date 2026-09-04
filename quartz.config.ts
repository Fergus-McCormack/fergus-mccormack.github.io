import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 configuration for fergus-mccormack.github.io
 *
 * Quartz is used purely as a Markdown -> HTML site generator here. The
 * "digital garden" features (graph view, explorer, backlinks, search,
 * tags, RSS) are switched off; see quartz.layout.ts for the page layout
 * and quartz/site.ts for the personal details used in the metadata.
 *
 * Reference: https://quartz.jzhao.xyz/configuration
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Fergus McCormack",
    pageTitleSuffix: "",
    // Plain page loads (no single-page-app router or link preview popovers):
    // fewer moving parts and nothing to break for a small academic site.
    enableSPA: false,
    enablePopovers: false,
    // No analytics or tracking scripts.
    analytics: null,
    locale: "en-GB",
    // Domain only, no protocol. Used for canonical URLs and the sitemap.
    baseUrl: "fergus-mccormack.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: { name: "Source Serif 4", weights: [400, 600] },
        body: { name: "Source Sans 3", weights: [400, 500, 600], includeItalic: true },
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff", // page background
          lightgray: "#e4e6ea", // rules and borders
          gray: "#6b7280", // muted text (dates, footer)
          darkgray: "#33373d", // body text
          dark: "#15181d", // headings
          secondary: "#1f4e79", // links and accents (deep blue)
          tertiary: "#2f6ea5", // link hover
          highlight: "rgba(31, 78, 121, 0.08)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#14161a",
          lightgray: "#2b2f37",
          gray: "#8d95a3",
          darkgray: "#d2d6dc",
          dark: "#f3f4f6",
          secondary: "#8fb8e0",
          tertiary: "#b7d2ec",
          highlight: "rgba(143, 184, 224, 0.12)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest",
        externalLinkIcon: false,
        openLinksInNewTab: false,
      }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      // sitemap.xml for search engines; no RSS feed.
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: false,
      }),
      Plugin.Assets(), // copies PDFs and images from content/
      Plugin.Static(), // copies quartz/static/ (favicon, social image)
      Plugin.RootFiles(), // copies root/ verbatim (search-engine verification files)
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
