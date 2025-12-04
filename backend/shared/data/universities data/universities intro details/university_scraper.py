# improved_ratio_calc.py
import json
import pandas as pd
import re
import math

INPUT_JSON = "universities_info.json"
OUTPUT_JSON = "universities_with_ratio.json"
OUTPUT_CSV = "universities_with_ratio.csv"

# keywords for detecting student subcategories and staff role keys
STUDENT_SUBKEYWORDS = [
    "undergrad", "undergraduate", "postgrad", "postgraduate",
    "graduate", "doctoral", "doctorate", "phd", "ph.d", "research students",
    "students"
]

STAFF_ROLE_KEYWORDS = [
    "academic staff", "academic", "faculty", "professor", "lecturer",
    "instructor", "researcher", "research", "dean", "director", "principal",
    "vice", "vc", "vice-chancellor", "vice chancellor", "chancellor",
    "administrative staff", "administrative", "admin", "staff", "officer"
]

def parse_number(text):
    """Extract integer from messy strings like '12,468', '10100+', '1,637[1]', '4k', '3.2k', '4,000–5,000'."""
    if text is None:
        return None
    s = str(text).strip()
    if s == "" or s.lower() in {"n/a", "none", "-", "–"}:
        return None
    s = s.replace("\u00A0", "")  # non-breaking spaces
    s = s.replace(",", "")
    # ranges: take first number e.g. "4000–5000" -> "4000"
    s = re.split(r"[–\-\u2013\u2014/]", s)[0].strip()
    # find number with optional decimal and optional k suffix
    m = re.search(r"([0-9]+(?:\.[0-9]+)?)\s*([kK]?)", s)
    if m:
        num_str, k = m.groups()
        try:
            num = float(num_str)
        except:
            return None
        if k:
            num *= 1000
        return int(round(num))
    # fallback: any integer
    m2 = re.search(r"(\d{1,})", s)
    if m2:
        return int(m2.group(1))
    return None

def compute_total_students(record):
    """
    Prefer summed student subcategories if any present.
    Otherwise use top-level 'Students' or 'Student' field.
    """
    # gather subcategory values (case-insensitive keys)
    sub_sum = 0
    found_sub = False
    for k, v in record.items():
        key = k.lower()
        if any(tok in key for tok in STUDENT_SUBKEYWORDS) and key not in ("students", "student"):
            n = parse_number(v)
            if n is not None:
                sub_sum += n
                found_sub = True

    if found_sub and sub_sum > 0:
        return sub_sum

    # fallback to Students field(s)
    for key in ("Students", "Student", "students", "student"):
        if key in record and record.get(key):
            n = parse_number(record.get(key))
            if n is not None:
                return n

    # last attempt: any key containing 'student'
    for k, v in record.items():
        if "student" in k.lower():
            n = parse_number(v)
            if n is not None:
                return n

    return None

def compute_total_staff(record):
    """
    Build staff total:
      - prefer Academic staff + Administrative staff if present
      - compute roles_sum from individual role fields (Dean, Director, etc.)
      - if roles_sum > (acad+admin) assume they are additional and add them
      - otherwise assume roles included in acad+admin
    """
    acad = None
    admin = None
    for k, v in record.items():
        key = k.lower()
        if "academic" in key and "staff" in key:
            acad = parse_number(v) or acad
        if ("administr" in key or "admin" in key) and "staff" in key:
            admin = parse_number(v) or admin

    # try to pick other common names if not found
    if acad is None:
        for alt in ("academic staff", "academic", "faculty"):
            if alt in record:
                acad = parse_number(record.get(alt)) or acad
    if admin is None:
        for alt in ("administrative staff", "administrative", "admin"):
            if alt in record:
                admin = parse_number(record.get(alt)) or admin

    # roles_sum: sum numeric values for role-like keys (dean,director,principal,vice,professor,lecturer,instructor)
    roles_sum = 0
    found_roles = False
    for k, v in record.items():
        key = k.lower()
        if any(tok in key for tok in ["dean", "director", "principal", "vice", "chancel", "professor", "lecturer", "instructor", "director", "officer"]):
            n = parse_number(v)
            if n is not None and n > 0:
                roles_sum += n
                found_roles = True

    # decide final total
    acad_val = acad if acad is not None else 0
    admin_val = admin if admin is not None else 0
    base = acad_val + admin_val

    if base == 0:
        # no acad/admin found -> use roles_sum if present
        return roles_sum if found_roles else None

    # if roles_sum is present and greater than base, assume they are separate and add
    if found_roles and roles_sum > base:
        return base + roles_sum

    # otherwise assume roles included in base
    return base if base > 0 else None

def simplify_ratio(a, b):
    if a is None or b is None:
        return None
    if b == 0:
        return None
    a = int(a); b = int(b)
    if a == 0:
        return "0:1"
    g = math.gcd(a, b)
    return f"{a//g}:{b//g}"

# load data
with open(INPUT_JSON, "r", encoding="utf-8") as f:
    records = json.load(f)

# process
for rec in records:
    total_students = compute_total_students(rec)
    total_staff = compute_total_staff(rec)

    # attach computed fields
    rec["Total_Students_Computed"] = total_students
    rec["Total_Staff_Computed"] = total_staff

    # simplified ratio
    rec["Student_Staff_Ratio"] = simplify_ratio(total_students, total_staff)

# save
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(records, f, ensure_ascii=False, indent=4)

df = pd.DataFrame(records)
df.to_csv(OUTPUT_CSV, index=False, encoding="utf-8-sig")

print("Done — saved:", OUTPUT_JSON, OUTPUT_CSV)
