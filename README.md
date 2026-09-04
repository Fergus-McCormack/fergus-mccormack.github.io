# fergus-mccormack.github.io

Academic website of Fergus McCormack, live at **https://fergus-mccormack.github.io/**.

Built with [Quartz v4](https://quartz.jzhao.xyz/) (MIT licence, see `LICENSE.txt`) and
published automatically by GitHub Actions to GitHub Pages on every push to `main`.

## How to update the site

Everything a reader sees is in `content/`:

| File | Page |
| --- | --- |
| `content/index.md` | Home page (photo, bio, job market paper, references, contact) |
| `content/research.md` | Research (job market paper, working papers, work in progress) |
| `content/cv.md` | CV summary (the PDF is the authoritative version) |
| `content/teaching.md` | Teaching |
| `content/papers/*.pdf` | PDFs linked from the pages. **Keep the file names fixed**: they are cited in the CV and in applications. To publish a new version, overwrite the file. |
| `content/images/` | Photo (900 px and 450 px versions) |

Name, email, profile links (LinkedIn, Google Scholar, ORCID, ...), the navigation bar and the
paper list used for search-engine metadata live in **`quartz/site.ts`**.

Two ways to make a change:

1. **On GitHub (no software needed):** open the file on github.com, click the pencil icon,
   edit, and commit to `main`. The site rebuilds in about two minutes
   (progress under the *Actions* tab). PDFs can be replaced with *Add file -> Upload files*.
2. **Locally:** edit the files in this folder, then

   ```bash
   git add -A
   git commit -m "Update research page"
   git push
   ```

### Preview locally (optional)

Requires Node.js 22 or newer.

```bash
npm ci                      # first time only
npx quartz build --serve    # then open http://localhost:8080
```

## Search engine optimisation (SEO)

What is already in place:

- Every page has a descriptive `<title>`, meta description, canonical URL and Open Graph /
  Twitter card tags (custom `quartz/components/SeoHead.tsx`).
- schema.org JSON-LD structured data: `Person`, `WebSite`, `ProfilePage`, and a
  `ScholarlyArticle` entry per paper (from `quartz/site.ts`).
- `sitemap.xml` (generated) and `robots.txt` (`content/robots.txt`).
- Fast, mobile-friendly static HTML with no tracking scripts; served over HTTPS.

Things only the site owner can do (each one strengthens ranking for a name search):

1. **Google Search Console** (https://search.google.com/search-console): add the property
   `https://fergus-mccormack.github.io/`, pick the *HTML tag* method, paste the `content`
   value into `googleSiteVerification` in `quartz/site.ts`, push, then verify and submit
   `https://fergus-mccormack.github.io/sitemap.xml`. Use *URL inspection -> Request indexing*
   for the home page to speed up the first crawl.
2. **Link to the site from profiles Google already trusts**: the Faculty of Economics
   profile page (ask the Faculty web team to add the URL), LinkedIn (website field),
   Google Scholar (create a profile and set the homepage), ORCID, RePEc/IDEAS, ResearchGate,
   Twitter/X or Bluesky if used, and the GitHub profile. Backlinks from these pages are the
   single strongest signal for a personal name search.
3. Add the URL to the header of the CV and to the title page of the job market paper
   ("Latest version: ..."), and to email signatures and conference slides.
4. Add any new profile URLs to `sameAs` in `quartz/site.ts` so the structured data links
   them together.

## Layout and styling

- `quartz.config.ts`: site title, base URL, fonts, colours, plugins.
- `quartz.layout.ts`: which components render (custom head, navigation, footer).
- `quartz/components/SeoHead.tsx`, `SiteNav.tsx`, `SiteFooter.tsx`: custom components.
- `quartz/styles/custom.scss`: all site-specific CSS.
- `quartz/static/`: favicon (`icon.png`) and social-sharing image (`og-image.jpg`).
