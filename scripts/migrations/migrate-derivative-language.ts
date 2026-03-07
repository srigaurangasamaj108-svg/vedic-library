import fs from "fs/promises"
import path from "path"

const ROOT = path.join(
  process.cwd(),
  "data",
  "itihasa",
  "mahabharata",
  "bhisma-parva",
  "bhagavad-gita",
  "derivatives"
)

const TARGET_LAYERS = [
  "translations",
  "synonyms",
  "exposition"
]

async function migrateFile(filePath: string, language: string) {

  const dir = path.dirname(filePath)
  const file = path.basename(filePath)

  if (file.includes(`.${language}.json`)) return

  if (!file.endsWith(".json")) return

  const newName = file.replace(
    /\.json$/,
    `.${language}.json`
  )

  const newPath = path.join(dir, newName)

  const raw = JSON.parse(await fs.readFile(filePath, "utf-8"))

  if (raw.uid && !raw.uid.endsWith(`.${language}`)) {
    raw.uid = `${raw.uid}.${language}`
  }

  await fs.writeFile(
    newPath,
    JSON.stringify(raw, null, 2)
  )

  console.log("Migrated:", file, "→", newName)
}

async function scanDirectory(dir: string, language: string) {

  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {

    const full = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      await scanDirectory(full, language)
      continue
    }

    if (entry.isFile()) {
      await migrateFile(full, language)
    }

  }
}

async function run() {

  for (const layer of TARGET_LAYERS) {

    const layerPath = path.join(ROOT, layer)

    try {

      const languages = await fs.readdir(layerPath)

      for (const lang of languages) {

        const langPath = path.join(layerPath, lang)

        const stat = await fs.stat(langPath)

        if (!stat.isDirectory()) continue

        await scanDirectory(langPath, lang)

      }

    } catch {
      continue
    }

  }

  console.log("\nMigration complete.")
}

run()
