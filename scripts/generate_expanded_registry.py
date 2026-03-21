import os
import json

DATA_ROOT = "../data"

expanded = []


def scan_json_files():
    for root, dirs, files in os.walk(DATA_ROOT):

        if "canonical" not in root:
            continue

        for file in files:
            if not file.endswith(".json"):
                continue

            full_path = os.path.join(root, file)

            relative = os.path.relpath(full_path, DATA_ROOT)

            parts = relative.split(os.sep)

            try:
                corpus = parts[0]
                text_group = parts[1]
                section = parts[2]
                work = parts[3]
            except:
                continue

            verse_id = file.replace(".json", "")

            entry = {
                "id": verse_id,
                "corpus": corpus,
                "text_group": text_group,
                "section": section,
                "work": work,
                "path": relative
            }

            expanded.append(entry)


def write_registry():

    output = "../data/vedic_corpus_registry_expanded.json"

    with open(output, "w", encoding="utf-8") as f:
        json.dump(expanded, f, indent=2, ensure_ascii=False)

    print("✅ Expanded registry written:", output)


def main():
    scan_json_files()
    write_registry()


if __name__ == "__main__":
    main()
