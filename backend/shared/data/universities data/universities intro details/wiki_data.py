import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
import time

# Load your university names from CSV
df = pd.read_csv("universities.csv")
universities = df.iloc[:, 0].dropna().tolist()  # assuming names are in first column

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/120.0.0.0 Safari/537.36"
}

def find_wikipedia_page(university):
    """Use Wikipedia search API to find best match page title."""
    url = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "list": "search",
        "srsearch": university,
        "format": "json"
    }

    res = requests.get(url, params=params, headers=HEADERS, timeout=10)

    if res.status_code != 200:
        print(f"⚠️ Failed to fetch Wikipedia API for {university} (Status: {res.status_code})")
        return None

    try:
        data = res.json()
    except ValueError:
        print(f"⚠️ Invalid JSON response for {university}: {res.text[:100]}...")
        return None

    if 'query' in data and data['query']['search']:
        return data['query']['search'][0]['title']
    else:
        print(f"❌ No Wikipedia page found for {university}")
        return None


def get_wiki_info(university):
    """Find the Wikipedia page and scrape its infobox."""
    title = find_wikipedia_page(university)
    if not title:
        print(f"⚠️ No Wikipedia result for {university}")
        return None

    url_title = title.replace(" ", "_")
    url = f"https://en.wikipedia.org/wiki/{url_title}"
    response = requests.get(url, headers=HEADERS)

    if response.status_code != 200:
        print(f"❌ Failed to fetch {university} ({url})")
        return None

    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table", {"class": "infobox"})
    if not table:
        print(f"⚠️ No infobox found for {title}")
        return None

    info = {"University": university, "Wikipedia_Title": title, "Wikipedia_URL": url}

    for row in table.find_all("tr"):
        header = row.find("th")
        cell = row.find("td")
        if header and cell:
            key = header.text.strip()
            value = cell.text.strip().replace("\n", " ")
            info[key] = value

    print(f"✅ Scraped: {title}")
    return info


# Scrape all
data = []
for uni in universities:
    result = get_wiki_info(uni)
    if result:
        data.append(result)
    time.sleep(1)  # polite delay

# Save both formats
if data:
    df = pd.DataFrame(data)
    df.to_csv("universities_info.csv", index=False, encoding="utf-8-sig")

    with open("universities_info.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print("\n🎓 Done! Data saved to CSV and JSON.")
else:
    print("❌ No data scraped.")
