import fetch from 'node-fetch';
import { University } from '../models/University.js';

const hostelsCache = new Map();
const CACHE_TTL_MS = (parseInt(process.env.HOSTELS_CACHE_TTL_MIN || '360', 10) || 360) * 60 * 1000;

const isObjectId = (value) => /^[0-9a-fA-F]{24}$/.test(value);

async function findUniversityByIdentifier(identifier) {
  if (isObjectId(identifier)) {
    const byId = await University.findById(identifier);
    if (byId) return byId;
  }

  const escapedIdentifier = identifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return University.findOne({
    $or: [
      { name: { $regex: new RegExp(`^${escapedIdentifier}$`, 'i') } },
      { apiName: { $regex: new RegExp(`^${escapedIdentifier}$`, 'i') } }
    ]
  });
}

function normalizeHostelResult(place, universityLocation) {
  const placeLocation = place?.geometry?.location || {};
  const placeLat = placeLocation.lat;
  const placeLng = placeLocation.lng;

  let distanceKm = null;
  if (typeof placeLat === 'number' && typeof placeLng === 'number') {
    const latDiff = (placeLat - universityLocation.lat) * 111;
    const lngDiff = (placeLng - universityLocation.lng) * 111 * Math.cos((universityLocation.lat * Math.PI) / 180);
    distanceKm = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
  }

  return {
    id: place.place_id,
    name: place.name || 'Unnamed Hostel',
    address: place.vicinity || place.formatted_address || 'Address unavailable',
    rating: place.rating || null,
    userRatingsTotal: place.user_ratings_total || 0,
    priceLevel: place.price_level ?? null,
    types: place.types || [],
    distanceKm: distanceKm ? Number(distanceKm.toFixed(2)) : null,
    location: {
      lat: placeLat,
      lng: placeLng
    }
  };
}

async function geocodeUniversity(university, apiKey) {
  if (typeof university?.coordinates?.lat === 'number' && typeof university?.coordinates?.lng === 'number') {
    return {
      lat: university.coordinates.lat,
      lng: university.coordinates.lng,
      source: university.coordinates.source || 'stored'
    };
  }

  const query = encodeURIComponent(`${university.name}, ${university.location || 'Pakistan'}`);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${apiKey}`;
  const geocodeRes = await fetch(url);
  const geocodeData = await geocodeRes.json();

  if (!geocodeRes.ok || geocodeData.status !== 'OK' || !geocodeData.results?.[0]?.geometry?.location) {
    throw new Error(`Geocoding failed for "${university.name}" (status: ${geocodeData.status || geocodeRes.status})`);
  }

  const { lat, lng } = geocodeData.results[0].geometry.location;

  university.coordinates = {
    lat,
    lng,
    source: 'google-geocoding',
    lastUpdated: new Date()
  };
  await university.save();

  return { lat, lng, source: 'google-geocoding' };
}

export const getNearbyHostels = async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'Missing GOOGLE_MAPS_API_KEY in environment'
      });
    }

    const universityId = req.params.id;
    const radius = Math.max(500, Math.min(parseInt(req.query.radius || '3000', 10) || 3000, 10000));
    const forceRefresh = String(req.query.refresh || '').toLowerCase() === 'true';

    const university = await findUniversityByIdentifier(universityId);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }

    const center = await geocodeUniversity(university, apiKey);
    const cacheKey = `${university._id.toString()}:${radius}`;
    const cached = hostelsCache.get(cacheKey);

    if (!forceRefresh && cached && (Date.now() - cached.fetchedAt < CACHE_TTL_MS)) {
      return res.json({
        university: {
          id: university._id,
          name: university.name,
          location: university.location,
          center,
        },
        radius,
        source: 'cache',
        hostels: cached.hostels
      });
    }

    const keyword = encodeURIComponent(req.query.keyword || 'student hostel');
    const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=${radius}&type=lodging&keyword=${keyword}&key=${apiKey}`;
    const nearbyRes = await fetch(nearbyUrl);
    const nearbyData = await nearbyRes.json();

    if (!nearbyRes.ok || (nearbyData.status !== 'OK' && nearbyData.status !== 'ZERO_RESULTS')) {
      return res.status(502).json({
        error: 'Failed to fetch nearby hostels from Google Places',
        details: nearbyData.status || nearbyRes.status
      });
    }

    const hostels = (nearbyData.results || [])
      .map(place => normalizeHostelResult(place, center))
      .sort((a, b) => {
        if (a.distanceKm == null) return 1;
        if (b.distanceKm == null) return -1;
        return a.distanceKm - b.distanceKm;
      });

    hostelsCache.set(cacheKey, {
      fetchedAt: Date.now(),
      hostels
    });

    return res.json({
      university: {
        id: university._id,
        name: university.name,
        location: university.location,
        center
      },
      radius,
      source: 'google-places',
      hostels
    });
  } catch (error) {
    console.error('Error fetching nearby hostels:', error);
    return res.status(500).json({
      error: 'Failed to fetch nearby hostels',
      details: error.message
    });
  }
};
