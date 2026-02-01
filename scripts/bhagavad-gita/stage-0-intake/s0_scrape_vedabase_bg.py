import requests
from bs4 import BeautifulSoup
import json
import os
import time
import re
from urllib.parse import urljoin
from datetime import datetime

# ---------------- CONFIG ----------------

PROJECT_ROOT = os.path.abspath(
    "data/_raw/itihasa/mahabharata/bhisma-parva/bhagavad-gita/vedabase"
)

RAW_JSON_DIR = os.path.join(PROJECT_ROOT, "raw-json")      # ### CHANGED
LOG_DIR = os.path.join(PROJECT_ROOT, "logs")               # ### NEW
LOG_FILE = os.path.join(LOG_DIR, "scrape.log")             # ### NEW

BASE_INDEX = "https://vedabase.io/en/library/bg/"
DELAY = 0.8   # polite delay between requests

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

# ----------------------------------------


def log(msg):
    timestamp = datetime.now().isoformat(timespec="seconds")
    line = f"[{timestamp}] {msg}"
    print(line)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def clean(el):
    return el.get_text("\n", strip=True) if el else ""


def build_json(soup, chapter, verse_id, verse_group):
    devanagari = clean(soup.select_one(".av-devanagari"))
    transliteration = clean(soup.select_one(".av-verse_text"))
    synonyms = clean(soup.select_one(".av-synonyms"))
    translation = clean(soup.select_one(".av-translation"))

    purport_container = (
        soup.select_one(".av-purport-text")
        or soup.select_one(".av-purport")
    )

    purport = []
    if purport_container:
        text = purport_container.get_text("\n", strip=True)
        purport = [p.strip() for p in text.split("\n") if p.strip()]

    verse_num = int(re.search(r"bg-\d+-(\d+)", verse_id).group(1))

    return {
        "scripture": "Bhagavad-gītā",
        "chapter": chapter,
        "verse": verse_num,
        "verse_id": verse_id,
        "verse_group": verse_group,
        "sanskrit": {
            "devanagari": devanagari,
            "iast": transliteration
        },
        "synonyms": synonyms,
        "translation": translation,
        "purport": purport,
        "source": {
            "author": "A. C. Bhaktivedanta Swami Prabhupāda",
            "edition": "Bhagavad-gītā As It Is",
            "language": "en",
            "provider": "vedabase.io"
        }
    }


def get_chapter_links(chapter):
    url = f"{BASE_INDEX}{chapter}/"
    r = requests.get(url, headers=HEADERS, timeout=30)
    r.raise_for_status()

    soup = BeautifulSoup(r.text, "html.parser")

    links = []
    for a in soup.select("a[href]"):
        href = a["href"]
        if re.match(rf"/en/library/bg/{chapter}/\d+(-\d+)?/", href):
            links.append(urljoin("https://vedabase.io", href))

    return list(dict.fromkeys(links))


def scrape_all_chapters():
    os.makedirs(RAW_JSON_DIR, exist_ok=True)   # ### CHANGED
    os.makedirs(LOG_DIR, exist_ok=True)        # ### NEW

    log("Starting Bhagavad-gītā scrape")

    for chapter in range(1, 19):
        log(f"Scraping Chapter {chapter}")

        chapter_dir = os.path.join(RAW_JSON_DIR, f"chapter-{chapter:02d}")
        os.makedirs(chapter_dir, exist_ok=True)

        links = get_chapter_links(chapter)

        for url in links:
            log(f"Fetching {url}")

            r = requests.get(url, headers=HEADERS, timeout=30)
            r.raise_for_status()

            soup = BeautifulSoup(r.text, "html.parser")
            heading = soup.select_one("h1").get_text()

            match = re.search(rf"{chapter}\.(\d+)[–-](\d+)", heading)
            if match:
                start, end = match.groups()
                verse_id = f"bg-{chapter:02d}-{int(start):02d}-{int(end):02d}"
                verse_group = f"{chapter}.{start}–{end}"
            else:
                num = re.search(rf"{chapter}\.(\d+)", heading).group(1)
                verse_id = f"bg-{chapter:02d}-{int(num):02d}"
                verse_group = None

            data = build_json(
                soup,
                chapter,
                verse_id=verse_id,
                verse_group=verse_group
            )

            path = os.path.join(chapter_dir, f"{verse_id}.json")
            with open(path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

            log(f"Wrote {path}")
            time.sleep(DELAY)

        log(f"Finished Chapter {chapter}")

    log("All 18 chapters scraped successfully")


if __name__ == "__main__":
    scrape_all_chapters()

