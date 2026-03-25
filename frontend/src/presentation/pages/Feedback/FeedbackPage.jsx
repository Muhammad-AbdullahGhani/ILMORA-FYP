import React from 'react';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "./../../../shared/components/ui/button";
import { Textarea } from "./../../../shared/components/ui/textarea";
import { useAuth } from "@/app/providers/AuthProvider";
import { axiosClient } from "@/shared/utils/axiosClient";
import { MessageSquare, Star, CheckCircle2, ArrowLeft } from "lucide-react";
export function FeedbackPage() {
  const { user } = useAuth();
  const [ratings, setRatings] = useState({
    ux: 0,
    accuracy: 0,
    overall: 0
  });
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const RatingStars = ({ category, value }) => {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-medium capitalize">{category}</div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() =>
                setRatings({
                  ...ratings,
                  [category]: star
                })
              }
              className="transition-transform hover:scale-110"
            >
              <Star className={`w-8 h-8 ${star <= value ? "fill-secondary text-secondary" : "text-muted-foreground"}`} />
            </button>
          ))}
        </div>
      </div>
    );
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (!ratings.overall) {
      setError("Please select an overall rating.");
      return;
    }
    try {
      setSubmitting(true);
      await axiosClient.post("/contact/feedback", {
        ratings,
        comments,
        userName: user?.name || "Anonymous",
        userEmail: user?.email || user?.username || "N/A"
      });
      setSubmitted(true);
      setComments("");
      setRatings({ ux: 0, accuracy: 0, overall: 0 });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-muted/30 p-2 sm:p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">We Value Your Feedback</h1>
          <p className="text-xl text-muted-foreground">Help us improve ILM-ORA by sharing your experience</p>
        </div>

        {submitted ? (
          <Card className="border-2 border-green-500 bg-green-50 dark:bg-green-950/20">
            <CardContent className="p-12 text-center">
              <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">Thank You!</h2>
              <p className="text-lg text-green-600 dark:text-green-300">Your feedback has been submitted successfully. We appreciate you helping us improve!</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Rate Your Experience</CardTitle>
              <CardDescription>Please rate different aspects of the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <RatingStars category="ux" value={ratings.ux} />
                  <RatingStars category="accuracy" value={ratings.accuracy} />
                  <RatingStars category="overall" value={ratings.overall} />
                </div>

                <div className="space-y-2">
                  <label className="font-medium">Additional Comments</label>
                  <Textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Share your suggestions, what you liked, or what we can improve..."
                    rows={6}
                    className="resize-none"
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" size="lg" disabled={submitting} className="w-full bg-primary hover:bg-primary/90">
                  {submitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}