import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Home, Search, MapPin, Star, ArrowLeft, Navigation, Loader2 } from "lucide-react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { hostelService } from "../../application/hostelService";

const mapContainerStyle = {
  width: "100%",
  height: "100%"
};

export function HostelFinder() {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
  const [radius, setRadius] = useState("3000");
  const [searchTerm, setSearchTerm] = useState("");
  const [hostels, setHostels] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 33.6844, lng: 73.0479 });
  const [loadingUniversities, setLoadingUniversities] = useState(true);
  const [loadingHostels, setLoadingHostels] = useState(false);
  const [error, setError] = useState(null);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

  useEffect(() => {
    const loadUniversities = async () => {
      try {
        setLoadingUniversities(true);
        const list = await hostelService.getUniversities();
        setUniversities(list);
        if (list.length > 0) {
          setSelectedUniversityId(list[0]._id || list[0].apiName || list[0].name);
        }
      } catch (err) {
        setError("Failed to load universities");
      } finally {
        setLoadingUniversities(false);
      }
    };
    loadUniversities();
  }, []);

  const loadHostels = async (refresh = false) => {
    if (!selectedUniversityId) return;
    try {
      setError(null);
      setLoadingHostels(true);
      const data = await hostelService.getNearbyByUniversity(selectedUniversityId, {
        radius: Number(radius),
        refresh
      });
      setHostels(data.hostels || []);
      if (data?.university?.center?.lat && data?.university?.center?.lng) {
        setMapCenter({
          lat: data.university.center.lat,
          lng: data.university.center.lng
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load nearby hostels");
      setHostels([]);
    } finally {
      setLoadingHostels(false);
    }
  };

  useEffect(() => {
    loadHostels(false);
  }, [selectedUniversityId, radius]);

  const filteredHostels = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return hostels;
    return hostels.filter((hostel) =>
      hostel.name.toLowerCase().includes(term) ||
      (hostel.address || "").toLowerCase().includes(term)
    );
  }, [hostels, searchTerm]);

  return (
    <div className="min-h-screen bg-muted/30 p-2 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <Home className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Hostel Finder</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Live hostels near selected universities using Google Maps data
              </p>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Select value={selectedUniversityId} onValueChange={setSelectedUniversityId} disabled={loadingUniversities}>
                  <SelectTrigger>
                    <SelectValue placeholder={loadingUniversities ? "Loading universities..." : "Select university"} />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map((uni) => (
                      <SelectItem key={uni._id || uni.apiName || uni.name} value={uni._id || uni.apiName || uni.name}>
                        {uni.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={radius} onValueChange={setRadius}>
                  <SelectTrigger>
                    <SelectValue placeholder="Radius" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1500">1.5 km</SelectItem>
                    <SelectItem value="3000">3 km</SelectItem>
                    <SelectItem value="5000">5 km</SelectItem>
                    <SelectItem value="8000">8 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search hostels by name or address..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Button onClick={() => loadHostels(true)} disabled={loadingHostels}>
                {loadingHostels ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Refresh Nearby Hostels
              </Button>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="h-96 overflow-hidden">
            <div className="w-full h-full">
              {!googleMapsApiKey ? (
                <div className="w-full h-full bg-muted flex items-center justify-center p-6 text-center text-muted-foreground">
                  Set `VITE_GOOGLE_MAPS_API_KEY` in frontend env to display map markers.
                </div>
              ) : (
                <LoadScript googleMapsApiKey={googleMapsApiKey}>
                  <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={13}>
                    <MarkerF position={mapCenter} label="U" />
                    {filteredHostels.map((hostel) => (
                      hostel?.location?.lat && hostel?.location?.lng ? (
                        <MarkerF
                          key={hostel.id}
                          position={{ lat: hostel.location.lat, lng: hostel.location.lng }}
                          title={hostelService.getMapMarkerLabel(hostel)}
                        />
                      ) : null
                    ))}
                  </GoogleMap>
                </LoadScript>
              )}
            </div>
          </Card>

          <div className="space-y-4 max-h-96 overflow-auto pr-1">
            {loadingHostels ? (
              <Card><CardContent className="p-6 text-center text-muted-foreground">Loading nearby hostels...</CardContent></Card>
            ) : filteredHostels.length === 0 ? (
              <Card><CardContent className="p-6 text-center text-muted-foreground">No hostels found for this university/radius.</CardContent></Card>
            ) : (
              filteredHostels.map((hostel) => (
                <Card key={hostel.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{hostel.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {hostel.address}
                        </div>
                      </div>
                      {typeof hostel.rating === "number" && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current text-secondary" />
                          <span className="font-semibold">{hostel.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {hostel.distanceKm != null && <Badge variant="outline">{hostel.distanceKm} km away</Badge>}
                      {typeof hostel.userRatingsTotal === "number" && hostel.userRatingsTotal > 0 && (
                        <Badge variant="outline">{hostel.userRatingsTotal} reviews</Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        asChild
                      >
                        <a href={hostelService.toGoogleMapsSearchUrl(hostel)} target="_blank" rel="noreferrer">
                          Open in Maps
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <a href={hostelService.toGoogleMapsDirectionsUrl(hostel, mapCenter)} target="_blank" rel="noreferrer">
                          <Navigation className="w-4 h-4 mr-2" />
                          Directions
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}