import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Building2, MapPin, DollarSign, Star, TrendingUp, Search, Filter, Heart, ArrowRight, ArrowLeft, Users, Award } from "lucide-react";
import { ImageWithFallback } from "@/shared/components/ImageWithFallback";
import { CompareDialog } from "@/shared/components/CompareDialog";
export function UniversityRecommendations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const [saved, setSaved] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch universities from backend university-service
  React.useEffect(() => {
    let mounted = true;
    const extractCity = (loc) => {
      if (!loc) return '';
      // Remove coordinate-like suffixes and trim
      const cleaned = String(loc).replace(/\d.*$/, '').trim();
      // Take first chunk before a double space or long comma list
      const parts = cleaned.split(',').map(p => p.trim()).filter(Boolean);
      return parts[0] || cleaned;
    };

    const normalize = (raw) => {
      if (!Array.isArray(raw)) return [];
      return raw.map((item, idx) => {
        const name = item.University || item.name || item.university || `University ${idx + 1}`;
        const locationRaw = item.Location || item.location || '';
        const location = extractCity(locationRaw);
        const students = item.Total_Students_Computed || item.Total_Students || item.Students || item.students || null;
        const accreditation = item.Accreditation || item.Affiliation || item.Affiliations || item['Affiliation'] || '';
        // Some datasets do not include programs - keep empty array safe
        const programs = item.programsOffered || item.ProgramsOffered || item.programs || [];
        return {
          id: item.id || idx + 1,
          name,
          location,
          country: '',
          image: item.image || item.Image || item.logo || 'https://via.placeholder.com/640x360?text=University',
          tuitionFee: item.tuitionFee || item.Tuition || 'N/A',
          match: item.match || 0,
          sentiment: item.sentiment || 0,
          ranking: item.ranking || item.Ranking || '',
          accreditation,
          programsOffered: Array.isArray(programs) ? programs : [],
          studentsCount: students || (item['Students'] ? String(item['Students']) : '—')
        };
      });
    };

    const fetchUniversities = async () => {
      try {
        const res = await fetch('http://localhost:3005/api/universities');
        const data = await res.json();
        if (!mounted) return;
        const raw = data && (data.universities || data) ? (data.universities || data) : [];
        setUniversities(normalize(raw));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch universities', err);
        if (mounted) setUniversities([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUniversities();
    return () => {
      mounted = false;
    };
  }, []);
  const filteredUniversities = (universities || []).filter(uni => {
    const name = (uni && uni.name) ? String(uni.name).toLowerCase() : '';
    const location = (uni && uni.location) ? String(uni.location).toLowerCase() : '';
    const term = String(searchTerm || '').toLowerCase();
    const matchesSearch = name.includes(term) || location.includes(term);
    const matchesCity = cityFilter === "all" || (uni && uni.location ? String(uni.location).includes(cityFilter) : false);
    return matchesSearch && matchesCity;
  });
  const toggleSave = id => {
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const toggleUniversitySelection = id => {
    setSelectedUniversities(prev => prev.includes(id) ? prev.filter(uniId => uniId !== id) : [...prev, id]);
  };
  const getSelectedUniversitiesData = () => {
    return universities.filter(uni => selectedUniversities.includes(uni.id));
  };
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
              <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">University Recommendations</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Top universities in Pakistan & abroad matching your profile</p>
            </div>
          </div>
        </div>

        <Card className="mb-6 md:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <Input placeholder="Search universities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 sm:pl-10 text-sm sm:text-base" />
              </div>

              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Islamabad">Islamabad</SelectItem>
                  <SelectItem value="Lahore">Lahore</SelectItem>
                  <SelectItem value="Karachi">Karachi</SelectItem>
                  <SelectItem value="Cambridge">Cambridge, USA</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="sm:size-default">
                <Filter className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">More </span>
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs sm:text-sm text-muted-foreground">Showing {filteredUniversities.length} universit{filteredUniversities.length !== 1 ? "ies" : "y"}{selectedUniversities.length > 0 && ` • ${selectedUniversities.length} selected`}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm" disabled={selectedUniversities.length < 2} onClick={() => setCompareDialogOpen(true)}>
              Compare Selected ({selectedUniversities.length})
            </Button>
            {selectedUniversities.length > 0 && <Button variant="ghost" size="sm" className="text-xs sm:text-sm" onClick={() => setSelectedUniversities([])}>Clear</Button>}
          </div>
        </div>

        <div className="grid gap-6">
          {filteredUniversities.map((university) => (
            <Card key={university.id} className={`hover:shadow-xl transition-all border-2 overflow-hidden ${selectedUniversities.includes(university.id) ? 'border-primary shadow-lg' : 'hover:border-primary/50'}`}>
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-80 h-64 lg:h-auto relative overflow-hidden">
                  <ImageWithFallback src={university.image} alt={university.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg">
                      <Checkbox checked={selectedUniversities.includes(university.id)} onCheckedChange={() => toggleUniversitySelection(university.id)} />
                    </div>
                    <Button size="icon" variant={saved.includes(university.id) ? "default" : "secondary"} className="rounded-full shadow-lg" onClick={() => toggleSave(university.id)}>
                      <Heart className={`w-5 h-5 ${saved.includes(university.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary shadow-lg">{university.match}% Match</Badge>
                  </div>
                </div>

                <CardContent className="flex-1 p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{university.name}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{university.location}</div>
                            <Badge variant="outline">{university.ranking}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="text-sm text-muted-foreground">Tuition Fee</div>
                            <div className="font-medium">{university.tuitionFee}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-secondary" />
                          <div>
                            <div className="text-sm text-muted-foreground">Sentiment Rating</div>
                            <div className="font-medium flex items-center gap-1">{university.sentiment}/5.0 <TrendingUp className="w-4 h-4 text-green-600" /></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm text-muted-foreground">Total Students</div>
                          <div className="font-medium">{university.studentsCount}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-accent" />
                        <div>
                          <div className="text-sm text-muted-foreground">Accreditation</div>
                          <div className="font-medium">{university.accreditation}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-muted-foreground mb-2">Programs You're Interested In:</div>
                        <div className="flex flex-wrap gap-2">{(university.programsOffered || []).map((program, index) => <Badge key={index} variant="outline" className="bg-card">{program}</Badge>)}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                      <Link to={`/university/${university.id}`} className="flex-1 min-w-[200px]"><Button className="w-full bg-primary hover:bg-primary/90">View Details <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
                      <Button variant="outline" className="flex-1 min-w-[120px]">Compare</Button>
                      <Link to="/scholarships" className="flex-1 min-w-[150px]"><Button variant="outline" className="w-full">Find Scholarships</Button></Link>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-2">
          <CardContent className="p-6 text-center">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="text-xl font-bold mb-2">View on Map</h3>
            <p className="text-muted-foreground mb-4">See all universities plotted on an interactive map</p>
            <Button variant="outline">Open Map View</Button>
          </CardContent>
        </Card>

        <CompareDialog open={compareDialogOpen} onOpenChange={setCompareDialogOpen} universities={getSelectedUniversitiesData()} />
      </div>
    </div>
  );
}