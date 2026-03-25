import { hostelAPI } from "../infrastructure/api/hostelAPI";
export const hostelService = {
  async getUniversities() {
    const response = await hostelAPI.getUniversities();
    return response.data?.universities || [];
  },

  async getNearbyByUniversity(universityId, { radius = 3000, keyword = "student hostel", refresh = false } = {}) {
    const response = await hostelAPI.getNearbyByUniversity(universityId, {
      radius,
      keyword,
      refresh
    });
    return response.data;
  },

  getMapMarkerLabel(hostel) {
    if (!hostel?.distanceKm) return hostel?.name || "Hostel";
    return `${hostel.name} (${hostel.distanceKm} km)`;
  },

  toGoogleMapsSearchUrl(hostel) {
    const query = encodeURIComponent(`${hostel.name} ${hostel.address || ""}`.trim());
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  },

  toGoogleMapsDirectionsUrl(hostel, universityCenter) {
    if (!universityCenter?.lat || !universityCenter?.lng || !hostel?.location?.lat || !hostel?.location?.lng) {
      return this.toGoogleMapsSearchUrl(hostel);
    }
    return `https://www.google.com/maps/dir/?api=1&origin=${universityCenter.lat},${universityCenter.lng}&destination=${hostel.location.lat},${hostel.location.lng}&travelmode=walking`;
  }
};