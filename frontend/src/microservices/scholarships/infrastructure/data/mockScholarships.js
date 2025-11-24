export const mockScholarships = [{
  id: "sch_1",
  name: "HEC Need-Based Scholarship",
  provider: "Higher Education Commission Pakistan",
  amount: {
    min: 50000,
    max: 200000,
    currency: "PKR"
  },
  type: "Need-based",
  level: "Undergraduate",
  deadline: new Date("2025-12-31"),
  eligibility: ["Pakistani national", "Family income < 300,000 PKR/year", "Minimum 60% marks"],
  requirements: ["Application form", "Income certificate", "Academic transcripts"],
  website: "https://hec.gov.pk",
  country: "Pakistan",
  description: "Financial assistance for deserving students from low-income families",
  isActive: true
}, {
  id: "sch_2",
  name: "NUST Merit Scholarship",
  provider: "NUST",
  amount: {
    min: 100000,
    max: 400000,
    currency: "PKR"
  },
  type: "Merit",
  level: "Undergraduate",
  deadline: new Date("2025-09-30"),
  eligibility: ["Minimum 85% in FSc/A-Levels", "Admitted to NUST"],
  requirements: ["NUST Entry Test score", "Academic records"],
  website: "https://nust.edu.pk",
  country: "Pakistan",
  description: "Merit-based scholarship for top-performing students",
  isActive: true
}, {
  id: "sch_3",
  name: "LUMS National Outreach Programme",
  provider: "LUMS",
  amount: {
    min: 200000,
    max: 800000,
    currency: "PKR"
  },
  type: "Need-based",
  level: "Undergraduate",
  deadline: new Date("2025-11-15"),
  eligibility: ["Outstanding academic record", "Financial need"],
  requirements: ["SAT/Entry test", "Essays", "Financial documents"],
  website: "https://lums.edu.pk",
  country: "Pakistan",
  description: "Full financial aid for talented students",
  isActive: true
}, {
  id: "sch_4",
  name: "Fulbright Scholarship",
  provider: "US Embassy Pakistan",
  amount: {
    min: 1000000,
    max: 3000000,
    currency: "PKR"
  },
  type: "Merit",
  level: "Graduate",
  deadline: new Date("2025-10-15"),
  eligibility: ["Bachelor's degree", "Professional experience", "English proficiency"],
  requirements: ["Online application", "Essays", "Recommendations", "TOEFL/IELTS"],
  website: "https://fulbright.org.pk",
  country: "USA",
  description: "Prestigious scholarship for Master's studies in USA",
  isActive: true
}, {
  id: "sch_5",
  name: "Ehsaas Undergraduate Scholarship",
  provider: "Ehsaas Programme",
  amount: {
    min: 50000,
    max: 100000,
    currency: "PKR"
  },
  type: "Need-based",
  level: "Undergraduate",
  deadline: new Date("2026-01-31"),
  eligibility: ["Underprivileged background", "Minimum 60% marks"],
  requirements: ["CNIC", "Academic records", "Poverty score"],
  website: "https://ehsaas.gov.pk",
  country: "Pakistan",
  description: "Government scholarship for underprivileged students",
  isActive: true
}, {
  id: "sch_6",
  name: "AKU Medical Scholarship",
  provider: "Aga Khan University",
  amount: {
    min: 300000,
    max: 1000000,
    currency: "PKR"
  },
  type: "Merit",
  level: "Undergraduate",
  deadline: new Date("2025-08-31"),
  eligibility: ["Admitted to MBBS program", "Excellent academic record"],
  requirements: ["MDCAT score", "Interview"],
  website: "https://aku.edu",
  country: "Pakistan",
  description: "Medical scholarship for outstanding students",
  isActive: true
}];