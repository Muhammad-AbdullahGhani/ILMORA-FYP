export const mockHostels = [{
  id: "hos_1",
  name: "NUST Boys Hostel",
  universityId: "uni_1",
  universityName: "NUST",
  type: "University",
  price: 15000,
  currency: "PKR",
  priceType: "monthly",
  distance: 0.5,
  facilities: ["WiFi", "Mess", "Laundry", "Study Room", "Security", "AC"],
  available: true,
  capacity: 200,
  occupied: 180,
  gender: "male",
  contact: {
    phone: "+92-51-9085-1234",
    email: "hostel@nust.edu.pk",
    person: "Hostel Warden"
  },
  address: "Sector H-12, Islamabad",
  coordinates: {
    lat: 33.6427,
    lng: 72.9871
  },
  images: [],
  rating: 4.5,
  reviews: 120,
  description: "Well-maintained university hostel with all modern facilities"
}, {
  id: "hos_2",
  name: "NUST Girls Hostel",
  universityId: "uni_1",
  universityName: "NUST",
  type: "University",
  price: 15000,
  currency: "PKR",
  priceType: "monthly",
  distance: 0.3,
  facilities: ["WiFi", "Mess", "Laundry", "Study Room", "Security", "AC", "Common Room"],
  available: true,
  capacity: 150,
  occupied: 145,
  gender: "female",
  contact: {
    phone: "+92-51-9085-1235",
    email: "hostel@nust.edu.pk",
    person: "Hostel Warden"
  },
  address: "Sector H-12, Islamabad",
  coordinates: {
    lat: 33.6427,
    lng: 72.9871
  },
  images: [],
  rating: 4.7,
  reviews: 95,
  description: "Safe and comfortable hostel for female students"
}, {
  id: "hos_3",
  name: "Fast Housing Society PG",
  universityId: "uni_2",
  universityName: "FAST",
  type: "Private",
  price: 12000,
  currency: "PKR",
  priceType: "monthly",
  distance: 1.2,
  facilities: ["WiFi", "Furnished", "Kitchen", "Security"],
  available: true,
  capacity: 20,
  occupied: 15,
  gender: "male",
  contact: {
    phone: "+92-21-1234-5678",
    email: "contact@fastpg.com",
    person: "Owner"
  },
  address: "University Road, Karachi",
  coordinates: {
    lat: 24.9246,
    lng: 67.0731
  },
  images: [],
  rating: 4.0,
  reviews: 45,
  description: "Private accommodation near FAST University"
}, {
  id: "hos_4",
  name: "LUMS On-Campus Residence",
  universityId: "uni_4",
  universityName: "LUMS",
  type: "University",
  price: 25000,
  currency: "PKR",
  priceType: "monthly",
  distance: 0.1,
  facilities: ["WiFi", "Mess", "Gym", "Sports", "Laundry", "AC", "Study Room"],
  available: true,
  capacity: 300,
  occupied: 290,
  gender: "co-ed",
  contact: {
    phone: "+92-42-3560-8000",
    email: "hostel@lums.edu.pk",
    person: "Residence Office"
  },
  address: "DHA, Lahore",
  coordinates: {
    lat: 31.4931,
    lng: 74.4126
  },
  images: [],
  rating: 4.8,
  reviews: 200,
  description: "Premium on-campus housing with excellent facilities"
}, {
  id: "hos_5",
  name: "AKU Student Accommodation",
  universityId: "uni_5",
  universityName: "AKU",
  type: "University",
  price: 30000,
  currency: "PKR",
  priceType: "monthly",
  distance: 0.2,
  facilities: ["WiFi", "Mess", "Security", "AC", "Study Room", "Medical"],
  available: true,
  capacity: 100,
  occupied: 95,
  gender: "co-ed",
  contact: {
    phone: "+92-21-3486-1234",
    email: "accommodation@aku.edu",
    person: "Housing Office"
  },
  address: "Stadium Road, Karachi",
  coordinates: {
    lat: 24.8913,
    lng: 67.0707
  },
  images: [],
  rating: 4.6,
  reviews: 80,
  description: "Medical students housing with proximity to hospital"
}];