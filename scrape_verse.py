import requests
from bs4 import BeautifulSoup
import json
import os
import re

# Configuration
BASE_URL = "https://vedabase.io/en/library/bg"
OUTPUT_DIR = "scraped_data"

def clean_text(text):
    """Cleans whitespace and newlines."""
    if not text:
        return ""
    return re.sub(r'\s+', ' ', text).strip()

def scrape_verse(chapter, verse):
    url = f"{BASE_URL}/{chapter}/{verse}/"
    print(f"Scraping: {url}")
    
    try:
        response = requests.get(url)
        if response.status_code != 200:
            print(f"Failed to fetch {url}")
            return None
            
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # 1. Devanagari
        devanagari_div = soup.find(class_="r-devanagari")
        devanagari = devanagari_div.get_text(separator="\n").strip() if devanagari_div else ""
        
        # 2. IAST (Verse Text)
        iast_div = soup.find(class_="r-verse-text")
        iast = iast_div.get_text(separator="\n").strip() if iast_div else ""
        
        # 3. Synonyms
        synonyms = []
        syn_div = soup.find(class_="r-synonyms")
        if syn_div:
            # Vedabase synonyms are often: <p><a>word</a> — meaning; <a>word</a> — meaning;</p>
            # This is a basic parser; may need refinement for complex edge cases
            raw_syn = syn_div.get_text()
            # Split by semicolon
            parts = raw_syn.split(";")
            for part in parts:
                if "—" in part:
                    sanskrit, meaning = part.split("—", 1)
                    synonyms.append({
                        "sanskrit": clean_text(sanskrit),
                        "meaning": clean_text(meaning)
                    })
        
        # 4. Translation
        translation_div = soup.find(class_="r-translation")
        translation = clean_text(translation_div.get_text()) if translation_div else ""
        
        # 5. Purport
        purport_div = soup.find(class_="r-purport")
        # Keep paragraphs for purport
        purport = ""
        if purport_div:
            # Remove "Purport" header if present
            h2 = purport_div.find("h2")
            if h2:
                h2.decompose()
            purport = purport_div.get_text(separator="\n\n").strip()

        # Construct JSON Object (Matching CanonicalVerse type)
        verse_data = {
            "uid": f"bg.{chapter}.{verse}",
            "devanagari": devanagari,
            "iast": iast,
            "synonyms": synonyms,
            "translation": {
                "language": "en",
                "text": translation
            },
            "purport": {
                "language": "en",
                "text": purport
            }
        }
        
        return verse_data

    except Exception as e:
        print(f"Error scraping {chapter}.{verse}: {e}")
        return None

def save_verse(data, chapter, verse):
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    filename = f"{OUTPUT_DIR}/bg.{chapter}.{verse}.json"
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved: {filename}")

def main():
    # Example: Scrape Chapter 1, Verse 1
    # You can loop this: for c in range(1, 19): for v in range(1, count+1): ...
    
    chapter = 1
    verse = 1
    
    data = scrape_verse(chapter, verse)
    if data:
        save_verse(data, chapter, verse)

if __name__ == "__main__":
    main()
