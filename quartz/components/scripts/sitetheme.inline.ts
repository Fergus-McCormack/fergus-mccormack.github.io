// Light/dark theme handling for the navigation toggle.
//
// Same behaviour as Quartz's darkmode.inline.ts except for the default: the
// site is light unless the visitor's operating system explicitly prefers dark
// (Quartz defaults to dark whenever no light preference is reported).
// A choice made with the toggle is remembered in localStorage.

const sitePrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
const siteTheme = localStorage.getItem("theme") ?? (sitePrefersDark ? "dark" : "light")
document.documentElement.setAttribute("saved-theme", siteTheme)

const emitSiteThemeChange = (theme: "light" | "dark") => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const switchTheme = () => {
    const newTheme =
      document.documentElement.getAttribute("saved-theme") === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    emitSiteThemeChange(newTheme)
  }

  const themeChange = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    emitSiteThemeChange(newTheme)
  }

  for (const darkmodeButton of document.getElementsByClassName("darkmode")) {
    darkmodeButton.addEventListener("click", switchTheme)
    window.addCleanup(() => darkmodeButton.removeEventListener("click", switchTheme))
  }

  // Follow operating-system changes while the page is open.
  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", themeChange)
  window.addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange))
})
