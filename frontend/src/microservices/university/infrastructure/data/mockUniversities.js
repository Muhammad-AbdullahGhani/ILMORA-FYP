export const mockUniversities = [{
  id: "uni_1",
  name: "NUST - National University of Sciences & Technology",
  location: "Islamabad, Pakistan",
  city: "Islamabad",
  country: "Pakistan",
  type: "Public",
  ranking: 1,
  fee: {
    min: 200000,
    max: 400000,
    currency: "PKR"
  },
  acceptanceRate: 15,
  totalStudents: 20000,
  website: "https://nust.edu.pk",
  programs: ["prog_1", "prog_5"],
  facilities: ["Library", "Labs", "Sports Complex", "Hostels", "Hospital"],
  description: "Top-ranked engineering and technology university in Pakistan with world-class facilities and renowned faculty.",
  coordinates: {
    lat: 33.6427,
    lng: 72.9871
  }
}, {
  id: "uni_2",
  name: "FAST - National University of Computer & Emerging Sciences",
  location: "Karachi, Pakistan",
  city: "Karachi",
  country: "Pakistan",
  type: "Public",
  ranking: 3,
  fee: {
    min: 150000,
    max: 300000,
    currency: "PKR"
  },
  acceptanceRate: 20,
  totalStudents: 15000,
  website: "https://nu.edu.pk",
  programs: ["prog_1", "prog_5"],
  facilities: ["Computer Labs", "Library", "Sports", "Cafeteria"],
  description: "Premier institution for computer science and emerging technologies.",
  coordinates: {
    lat: 24.9246,
    lng: 67.0731
  }
}, {
  id: "uni_3",
  name: "NCA - National College of Arts",
  location: "Lahore, Pakistan",
  city: "Lahore",
  country: "Pakistan",
  type: "Public",
  ranking: 1,
  fee: {
    min: 100000,
    max: 200000,
    currency: "PKR"
  },
  acceptanceRate: 25,
  totalStudents: 2000,
  website: "https://nca.edu.pk",
  programs: ["prog_4"],
  facilities: ["Art Studios", "Design Labs", "Exhibition Halls", "Library"],
  description: "Leading arts and design institution in Pakistan.",
  coordinates: {
    lat: 31.5825,
    lng: 74.3095
  }
}, {
  id: "uni_4",
  name: "LUMS - Lahore University of Management Sciences",
  location: "Lahore, Pakistan",
  city: "Lahore",
  country: "Pakistan",
  type: "Private",
  ranking: 2,
  fee: {
    min: 400000,
    max: 800000,
    currency: "PKR"
  },
  acceptanceRate: 10,
  totalStudents: 5000,
  website: "https://lums.edu.pk",
  programs: ["prog_1", "prog_2"],
  facilities: ["Business Labs", "Library", "Sports Complex", "Hostel"],
  description: "Top private university for business and technology.",
  coordinates: {
    lat: 31.4931,
    lng: 74.4126
  }
}, {
  id: "uni_5",
  name: "AKU - Aga Khan University",
  location: "Karachi, Pakistan",
  city: "Karachi",
  country: "Pakistan",
  type: "Private",
  ranking: 1,
  fee: {
    min: 500000,
    max: 1000000,
    currency: "PKR"
  },
  acceptanceRate: 5,
  totalStudents: 3000,
  website: "https://aku.edu",
  programs: ["prog_3"],
  facilities: ["Teaching Hospital", "Research Labs", "Library", "Hostel"],
  description: "Premier medical university with world-class facilities.",
  coordinates: {
    lat: 24.8913,
    lng: 67.0707
  }
}];