import path from "path"
import fs from "fs"
import { FilePath, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { glob } from "../../util/glob"

interface Options {
  /** Folder (relative to the repository root) whose files are copied verbatim to the site root */
  dir: string
}

const defaultOptions: Options = {
  dir: "root",
}

/**
 * RootFiles: copies every file in `root/` to the output root, byte for byte and
 * with its exact file name.
 *
 * Needed for search-engine verification files (Google Search Console's
 * `google....html`, Bing's `BingSiteAuth.xml`) that must be served at the
 * domain root under an exact name. Quartz's Assets emitter cannot do this
 * because it drops the `.html` extension when it slugifies file names.
 */
export const RootFiles: QuartzEmitterPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "RootFiles",
    async *emit({ argv }) {
      if (!fs.existsSync(opts.dir)) {
        return
      }
      const fps = await glob("**", opts.dir, [])
      for (const fp of fps) {
        const src = joinSegments(opts.dir, fp) as FilePath
        const dest = joinSegments(argv.output, fp) as FilePath
        await fs.promises.mkdir(path.dirname(dest), { recursive: true })
        await fs.promises.copyFile(src, dest)
        yield dest
      }
    },
    async *partialEmit() {},
  }
}
