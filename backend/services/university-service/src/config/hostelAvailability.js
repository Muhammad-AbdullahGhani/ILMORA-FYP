// Research-backed hostel availability policy used by stats and data-seeding scripts.
// Status values:
// - 'available': on-campus/internal hostel available
// - 'none': no internal hostel availability for this campus
// - 'limited': only limited categories/very restricted seats (treated as available for scoring)
// - 'unknown': not confidently verified

const HOSTEL_POLICY_RULES = [
  // -----------------------------
  // INTERNAL HOSTEL: NOT AVAILABLE
  // -----------------------------
  {
    matchers: [
      /FAST-NUCES/i,
      /National University Of Computer And Emerging Sciences/i
    ],
    status: 'none',
    source: 'FAST Islamabad pages focus on campus life; no general internal hostel allocation policy for regular intake was found.'
  },
  {
    matchers: [
      /Bahria University,\s*E-8 Campus/i,
      /Bahria University,\s*H-11 Campus/i
    ],
    status: 'none',
    source: 'Bahria Islamabad hostel information is category-restricted/limited and not a broad internal hostel offer for all students.'
  },
  {
    matchers: [
      /Pakistan Institute Of Development Economics/i,
      /\bPIDE\b/i
    ],
    status: 'none',
    source: 'Public reporting indicates student accommodation moved to private/off-campus hostels, not a stable internal hostel model.'
  },
  {
    matchers: [
      /Shifa Tameer-e-millat University/i,
      /\bSTMU\b/i
    ],
    status: 'none',
    source: 'STMU accommodation is listed in rented premises near campus (off-campus), not internal hostel blocks.'
  },
  {
    matchers: [
      /Army Public College of Management and Sciences/i,
      /\bAPCOMS\b/i
    ],
    status: 'none',
    source: 'Available listings are nearby private hostels; no reliable internal hostel page evidence found.'
  },
  {
    matchers: [
      /Mohiuddin Islamic University/i
    ],
    status: 'none',
    source: 'No reliable internal-hostel evidence for Islamabad campus; accommodation references are nearby private hostels.'
  },
  {
    matchers: [
      /Federal Urdu University Of Arts Science & Technology/i,
      /\bFUUAST\b/i
    ],
    status: 'none',
    source: 'No verified internal-hostel evidence for Islamabad campus; nearby private hostel listings dominate.'
  },

  // -----------------------------
  // INTERNAL HOSTEL: AVAILABLE
  // -----------------------------
  {
    matchers: [/NUST/i, /National University Of Science & Technology/i],
    status: 'available',
    source: 'NUST Housing & Dining lists multiple male/female hostels on campus.'
  },
  {
    matchers: [/NUML/i, /National University Of Modern Languages/i],
    status: 'available',
    source: 'NUML facilities page explicitly lists fully furnished separate hostels.'
  },
  {
    matchers: [/International Islamic University/i, /\bIIUI\b/i],
    status: 'available',
    source: 'IIUI hostel directorate pages list multiple male/female hostels and seat systems.'
  },
  {
    matchers: [/Quaid-e-azam University/i, /\bQAU\b/i],
    status: 'available',
    source: 'QAU student accommodation pages list dedicated boys and girls hostels.'
  },
  {
    matchers: [/Pakistan Institute Of Engineering & Applied Sciences/i, /\bPIEAS\b/i],
    status: 'available',
    source: 'PIEAS campus facilities pages list multiple hostel blocks and services.'
  },
  {
    matchers: [/National University Of Technology/i, /\bNUTECH\b/i],
    status: 'available',
    source: 'NUTECH hostel pages list separate boys/girls hostel facilities.'
  },
  {
    matchers: [/Rawalpindi Medical University/i, /\bRMU\b/i],
    status: 'available',
    source: 'RMU official hostels page lists boys and girls hostels with wardens.'
  },
  {
    matchers: [/Allama Iqbal Open University/i, /\bAIOU\b/i],
    status: 'available',
    source: 'AIOU hostels page lists male and female halls at main campus.'
  },
  {
    matchers: [/Fatima Jinnah Women University/i, /\bFJWU\b/i],
    status: 'available',
    source: 'FJWU on-campus facilities and hostel instructions indicate active hostels.'
  },
  {
    matchers: [/Institute Of Space Technology/i, /\bIST\b/i],
    status: 'available',
    source: 'IST housing/dining references indicate student hostel accommodation.'
  },
  {
    matchers: [/National Skills University/i, /\bNSU\b/i],
    status: 'available',
    source: 'NSU campus facilities references mention boys/girls hostel support.'
  },
  {
    matchers: [/Foundation University/i],
    status: 'available',
    source: 'Foundation University campus-life references list dedicated hostels.'
  },
  {
    matchers: [/Ghulam Ishaq Khan Institute/i, /\bGIKI\b/i],
    status: 'available',
    source: 'GIKI hostel allotment and hostel development notices indicate internal hostels.'
  },
  {
    matchers: [/Sir Syed Case Institute Of Technology/i, /\bCASE\b/i],
    status: 'available',
    source: 'CASE official site includes a hostel section for student accommodation.'
  },
  {
    matchers: [/Comsats University Islamabad/i, /\bCOMSATS\b/i],
    status: 'available',
    source: 'CUI campus references include hostel access for outstation students (availability based).'
  },
  {
    matchers: [/Capital University Of Science And Technology/i, /\bCUST\b/i],
    status: 'available',
    source: 'CUST university/campus references indicate student hostel accommodation.'
  },
  {
    matchers: [/Al-khair University/i, /Al-Khair University/i],
    status: 'available',
    source: 'University listings indicate male/female hostel provision.'
  },

  // -----------------------------
  // INTERNAL HOSTEL: LIMITED / SPECIAL-CASE
  // -----------------------------
  {
    matchers: [/National Defence University/i, /\bNDU\b/i],
    status: 'limited',
    source: 'Hostel mentions exist but detailed campus-level allocation evidence is limited.'
  },
  {
    matchers: [/Riphah International University/i],
    status: 'limited',
    source: 'Hostel availability is campus-dependent; strong evidence exists for some campuses but not uniform across all Islamabad units.'
  },
  {
    matchers: [/Air University/i],
    status: 'limited',
    source: 'Air University hostels are confirmed for some campuses; Islamabad main-campus internal allocation is not uniformly documented.'
  },

  // -----------------------------
  // INTERNAL HOSTEL: UNKNOWN
  // -----------------------------
  {
    matchers: [/Abasyn University/i],
    status: 'unknown',
    source: 'No reliable internal-hostel evidence from official Islamabad-campus pages.'
  },
  {
    matchers: [/Al-karam International University/i],
    status: 'unknown',
    source: 'Publicly verifiable campus-level internal-hostel evidence not captured yet.'
  },
  {
    matchers: [/Beaconhouse National University/i, /\bBNU\b/i],
    status: 'unknown',
    source: 'Hostel evidence is not consistently available from official campus pages in this dataset pass.'
  },
  {
    matchers: [/Northern University/i],
    status: 'unknown',
    source: 'Internal-hostel confirmation needs direct campus documentation.'
  },
  {
    matchers: [/Shaheed Zulfiqar Ali Bhutto Medical University/i, /\bSZABMU\b/i],
    status: 'unknown',
    source: 'Internal-hostel evidence not confidently confirmed during this pass.'
  }
];

const DEFAULT_POLICY = {
  status: 'unknown',
  source: 'No reliable campus-level evidence captured yet.'
};

export const getHostelPolicy = (universityName = '') => {
  const name = String(universityName || '').trim();
  if (!name) return DEFAULT_POLICY;

  const matchedRule = HOSTEL_POLICY_RULES.find((rule) =>
    rule.matchers.some((matcher) => matcher.test(name))
  );

  return matchedRule || DEFAULT_POLICY;
};

export const isInternalHostelUnavailable = (universityName = '') =>
  getHostelPolicy(universityName).status === 'none';

