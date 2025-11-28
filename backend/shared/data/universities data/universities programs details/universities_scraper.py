"""
universities_scraper_fixed.py

- Selenium scraper for EduVision (Islamabad universities)
- Scrapes: university name, detail URL, phone (from listing) and Bachelors programs only
- Outputs JSON and CSV (no logo columns)
"""

import time
import re
import json
import csv
import logging
from tqdm import tqdm
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

# --------------- Config ---------------
CITY = "ISLAMABAD"
BASE_SEARCH_URL = f"https://www.eduvision.edu.pk/institutions-search.php?name=&city={CITY}&level=University&cat="
OUTPUT_JSON = f"universities_{CITY.lower()}_bachelors1.json"
OUTPUT_CSV = f"universities_{CITY.lower()}_bachelors1.csv"
HEADLESS = True
PAGE_LOAD_WAIT = 6  # seconds (adjust if your connection is slow)
# --------------------------------------

# Helper: detect bachelor program names
_bachelor_re = re.compile(r'\b(BS|BE|AD|BA|BBA|BSC|B\.S\.|Bachelors|Bachelor)\b', re.IGNORECASE)
def is_bachelor_program(name: str) -> bool:
    if not name:
        return False
    return bool(_bachelor_re.search(name))

# Setup Chrome driver
options = Options()
if HEADLESS:
    options.add_argument("--headless")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--window-size=1920,1080")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

try:
    logging.info("Opening search page...")
    driver.get(BASE_SEARCH_URL)

    # Wait for the listing containers to load
    try:
        WebDriverWait(driver, 15).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.threecolumn"))
        )
    except Exception:
        logging.warning("Timeout waiting for .threecolumn elements; continuing anyway after a short pause.")
        time.sleep(3)

    # Collect listing elements and extract name, detail_url, and phone from listing
    listing_elems = driver.find_elements(By.CSS_SELECTOR, "div.threecolumn")
    logging.info(f"Found {len(listing_elems)} listing elements (threecolumn) on the page.")

    univ_list = []
    for el in listing_elems:
        try:
            fixtext = el.find_element(By.CSS_SELECTOR, ".fixText")
        except Exception:
            # fallback: whole element text
            text = el.text.strip()
            name = text.splitlines()[0].strip() if text else None
            href = None
            phone = None
            univ_list.append({"name": name, "detail_url": href, "phone": phone})
            continue

        # name & URL
        try:
            a = fixtext.find_element(By.TAG_NAME, "a")
            name = a.text.strip()
            href = a.get_attribute("href")
        except Exception:
            name = fixtext.text.splitlines()[0].strip() if fixtext.text else None
            href = None

        # phone: typically on the next line(s) inside .fixText
        phone = None
        try:
            # get all lines inside .fixText
            txt = fixtext.text.strip()
            lines = [ln.strip() for ln in txt.splitlines() if ln.strip()]
            # typical pattern: first line is name, second is phone
            if len(lines) >= 2:
                # try to find a phone-like token in remaining lines
                for line in lines[1:]:
                    m = re.search(r'(\+?\d[\d\-\s]{6,}\d)', line)
                    if m:
                        phone = m.group(1)
                        break
                # fallback: take second line if no regex match but it's short-ish
                if not phone and len(lines[1]) <= 30:
                    phone = lines[1]
            else:
                # fallback search in full text
                m = re.search(r'(\+?\d[\d\-\s]{6,}\d)', txt)
                if m:
                    phone = m.group(1)
        except Exception:
            phone = None

        univ_list.append({"name": name, "detail_url": href, "phone": phone})

    # Deduplicate by detail_url (keep order)
    seen = set()
    uniq_univ_list = []
    for u in univ_list:
        key = u.get("detail_url") or u.get("name")
        if key and key not in seen:
            seen.add(key)
            uniq_univ_list.append(u)
    logging.info(f"{len(uniq_univ_list)} unique universities to scrape (after dedup).")

    # Now visit each university page and extract bachelor programs
    all_universities = []
    for u in tqdm(uniq_univ_list, desc="Scraping universities"):
        detail_url = u.get("detail_url")
        name_from_listing = u.get("name")
        phone_from_listing = u.get("phone")

        uni = {
            "name": name_from_listing,
            "detail_url": detail_url,
            "phone": phone_from_listing,
            "bachelors_programs": []
        }

        if not detail_url:
            all_universities.append(uni)
            continue

        # load detail page
        try:
            driver.get(detail_url)
            # wait a bit for JS
            time.sleep(1.0)
            # optional longer wait if page is heavier
            WebDriverWait(driver, PAGE_LOAD_WAIT).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        except Exception:
            # continue even if slow
            pass

        # Find program tables. Strategy:
        # - get all <table> elements and test header or table text for signs of programs
        try:
            tables = driver.find_elements(By.TAG_NAME, "table")
        except Exception:
            tables = []

        for table in tables:
            try:
                table_text = table.text or ""
                # quick heuristics: parse tables that mention Degree/Program or have 'BS'/'BE' or 'Duration'/'Fee'
                header_ths = []
                try:
                    header_ths = [th.text.strip().lower() for th in table.find_elements(By.TAG_NAME, "th")]
                except Exception:
                    header_ths = []

                if (any(k in table_text.upper() for k in ("BS -", "BE -", "AD -")) 
                    or any("degree" in h or "program" in h or "duration" in h or "fee" in h for h in header_ths)
                    or re.search(r'\bBS\b|\bBE\b|\bAD\b|\bBACHELOR\b', table_text, re.IGNORECASE)):
                    # Treat this as a program table
                    try:
                        rows = table.find_elements(By.TAG_NAME, "tr")
                    except Exception:
                        rows = []

                    for row in rows:
                        try:
                            cols = row.find_elements(By.TAG_NAME, "td")
                            if not cols:
                                continue
                            # Extract text from columns, allow variable column counts
                            col_texts = [c.text.strip() for c in cols]
                            program_name = col_texts[0] if len(col_texts) >= 1 else ""
                            # Only keep bachelor programs
                            if not is_bachelor_program(program_name):
                                # sometimes program_name is empty or header: skip
                                continue

                            duration = col_texts[1] if len(col_texts) >= 2 else ""
                            fee = col_texts[2] if len(col_texts) >= 3 else ""
                            merit = col_texts[3] if len(col_texts) >= 4 else ""

                            uni["bachelors_programs"].append({
                                "program_name": program_name,
                                "duration": duration,
                                "fee_per_sem": fee,
                                "merit_deadline": merit
                            })
                        except Exception:
                            continue
            except Exception:
                continue

        # If no bachelors_programs found on detail page, keep uni with empty list (still useful)
        all_universities.append(uni)

    # Save JSON (no logos)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as jf:
        json.dump(all_universities, jf, ensure_ascii=False, indent=2)
    logging.info(f"Saved JSON -> {OUTPUT_JSON}")

    # Save CSV (flatten programs). If no programs, one row with empty program fields.
    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as cf:
        writer = csv.writer(cf)
        writer.writerow(["University Name", "Detail URL", "Phone", "Program Name", "Duration", "Fee/Sem", "Merit Deadline"])
        for uni in all_universities:
            progs = uni.get("bachelors_programs") or []
            if progs:
                for p in progs:
                    writer.writerow([
                        uni.get("name") or "",
                        uni.get("detail_url") or "",
                        uni.get("phone") or "",
                        p.get("program_name") or "",
                        p.get("duration") or "",
                        p.get("fee_per_sem") or "",
                        p.get("merit_deadline") or ""
                    ])
            else:
                # no programs -> one empty row for this university
                writer.writerow([uni.get("name") or "", uni.get("detail_url") or "", uni.get("phone") or "", "", "", "", ""])
    logging.info(f"Saved CSV -> {OUTPUT_CSV}")

finally:
    driver.quit()
    logging.info("Driver closed. Done.")
