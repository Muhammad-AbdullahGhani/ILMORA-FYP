import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Star, MapPin, DollarSign, Users, Award } from "lucide-react";
export function CompareDialog({
  open,
  onOpenChange,
  universities
}) {
  if (universities.length === 0) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compare Universities</DialogTitle>
          <DialogDescription>Side-by-side comparison of {universities.length} universities</DialogDescription>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-left font-semibold">Feature</th>
                {universities.map(uni => (
                  <th key={uni.id} className="p-3 text-left font-semibold min-w-[200px]">{uni.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </td>
                {universities.map(uni => (
                  <td key={uni.id} className="p-3">{uni.location}</td>
                ))}
              </tr>

              <tr className="border-b bg-muted/30">
                <td className="p-3 font-medium">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Tuition Fee
                </td>
                {universities.map(uni => (
                  <td key={uni.id} className="p-3">{uni.tuitionFee}</td>
                ))}
              </tr>

              <tr className="border-b">
                <td className="p-3 font-medium">
                  <Star className="w-4 h-4 inline mr-2" />
                  Sentiment Rating
                </td>
                {universities.map(uni => (
                  <td key={uni.id} className="p-3">
                    <div className="flex items-center gap-1">
                      {uni.sentiment}/5.0
                      <Star className="w-4 h-4 fill-secondary text-secondary" />
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b bg-muted/30">
                <td className="p-3 font-medium">
                  <Award className="w-4 h-4 inline mr-2" />
                  Ranking
                </td>
                {universities.map(uni => (
                  <td key={uni.id} className="p-3"><Badge>{uni.ranking}</Badge></td>
                ))}
              </tr>

              <tr className="border-b">
                <td className="p-3 font-medium">
                  <Users className="w-4 h-4 inline mr-2" />
                  Total Students
                </td>
                {universities.map(uni => (
                  <td key={uni.id} className="p-3">{uni.studentsCount}</td>
                ))}
              </tr>

              <tr className="border-b bg-muted/30">
                <td className="p-3 font-medium">
                  <Award className="w-4 h-4 inline mr-2" />
                  Accreditation
                </td>
                {universities.map(uni => (
                  <td key={uni.id} className="p-3">{uni.accreditation}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}