# Hostel Availability Policy Matrix (Islamabad Dataset)

This matrix drives hostel-factor behavior in review stats.  
Policy source in code: `src/config/hostelAvailability.js`.

## Status Definitions

- `available`: internal/on-campus hostel is available
- `none`: no reliable internal hostel model for general student allocation
- `limited`: campus-dependent or category-limited accommodation
- `unknown`: insufficient official evidence captured

## Universities Marked `none` (Hostel score forced to 0)

- Army Public College of Management and Sciences (APCOMS)
- Bahria University, E-8 Campus, Islamabad
- Bahria University, H-11 Campus, Islamabad
- Federal Urdu University Of Arts Science & Technology Islamabad, Islamabad
- Mohiuddin Islamic University [Islamabad Campus], Islamabad
- National University Of Computer And Emerging Sciences, Islamabad, Islamabad (FAST-NUCES)
- Pakistan Institute Of Development Economics, Islamabad
- Shifa Tameer-e-millat University, Islamabad

## Universities Marked `available`

- Al-khair University [AJK], Islamabad
- Allama Iqbal Open University, Islamabad
- Capital University Of Science And Technology, Islamabad
- Comsats University Islamabad, Islamabad
- Fatima Jinnah Women University
- Foundation University, Islamabad
- Ghulam Ishaq Khan Institute of Engineering Sciences and Technology
- Institute Of Space Technology, Islamabad
- International Islamic University, Islamabad
- National Skills University, Islamabad
- National University Of Modern Languages, Islamabad, Islamabad
- National University Of Science & Technology, Islamabad
- National University Of Technology, Islamabad
- Pakistan Institute Of Engineering & Applied Sciences, Islamabad
- Quaid-e-azam University, Islamabad
- Rawalpindi Medical University
- Sir Syed Case Institute Of Technology, Islamabad

## Universities Marked `limited`

- Air University, Islamabad
- Air University, H-11 Campus, Islamabad
- National Defence University, Islamabad
- Riphah International University, Islamabad
- Riphah International University, Rawalpindi Campus

## Universities Marked `unknown`

- Abasyn University (sub Campus), Islamabad
- Al-karam International University, Islamabad
- Beaconhouse National University
- Northern University, Islamabad
- Shaheed Zulfikar Ali Bhutto Institute of Science and Technology (SZABIST), Islamabad
- Shaheed Zulfiqar Ali Bhutto Medical University, Pims, Islamabad

## Operational Behavior

- Review stats endpoint returns `hostelAvailability` metadata.
- If policy status is `none`, backend forces `rating_breakdown.Hostels = 0`.
- Synthetic review generators skip hostel generation for `none` universities.
