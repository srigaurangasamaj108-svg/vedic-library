import os
import json

ROOT = "data"


def scan_directory(path):
    items = {}
    for name in sorted(os.listdir(path)):
        full = os.path.join(path, name)

        if name.startswith("."):
            continue

        if os.path.isdir(full):
            sub = scan_directory(full)
            if sub:
                items[name] = sub
            else:
                items[name] = []
    return items


def build_registry():
    registry = {}

    for top in sorted(os.listdir(ROOT)):
        top_path = os.path.join(ROOT, top)

        if top.startswith("."):
            continue

        if not os.path.isdir(top_path):
            continue

        if top in ["frontend", "backend"]:
            continue

        registry[top] = scan_directory(top_path)

    return registry


def main():
    registry = build_registry()

    output_path = os.path.join(ROOT, "vedic_corpus_registry.json")

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(registry, f, indent=2, ensure_ascii=False)

    print("✅ Registry generated:")
    print(output_path)


if __name__ == "__main__":
    main()
