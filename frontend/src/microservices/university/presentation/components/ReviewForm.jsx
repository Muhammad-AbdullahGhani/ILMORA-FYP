import React, { useState } from 'react';
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const FACTORS = [
    { value: 'Academics', label: 'Academics' },
    { value: 'Faculty', label: 'Faculty' },
    { value: 'Campus Life', label: 'Campus Life' },
    { value: 'Facilities', label: 'Facilities' },
    { value: 'Placements', label: 'Placements' },
];

export function ReviewForm({ university, city, onSuccess }) {
    const [formData, setFormData] = useState({
        review_text: '',
        factor: '',
        authorName: '',
        authorClass: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Validation
        if (!formData.review_text.trim()) {
            setError('Please write your review');
            return;
        }

        if (formData.review_text.length < 10) {
            setError('Review must be at least 10 characters long');
            return;
        }

        if (!formData.factor) {
            setError('Please select a factor');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:3005/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    review_text: formData.review_text,
                    factor: formData.factor,
                    university,
                    city,
                    authorName: formData.authorName || 'Anonymous',
                    authorClass: formData.authorClass || null
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit review');
            }

            // Success!
            setSuccess(true);
            setFormData({
                review_text: '',
                factor: '',
                authorName: '',
                authorClass: ''
            });

            // Call success callback to refresh reviews
            if (onSuccess) {
                onSuccess(data.review);
            }

            // Hide success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);

        } catch (err) {
            console.error('Submit review error:', err);
            setError(err.message || 'Failed to submit review. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Write a Review</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Review Text */}
                    <div className="space-y-2">
                        <Label htmlFor="review_text">Your Review *</Label>
                        <Textarea
                            id="review_text"
                            placeholder="Share your experience about this university..."
                            value={formData.review_text}
                            onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
                            rows={4}
                            maxLength={2000}
                            disabled={loading}
                            className="resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                            {formData.review_text.length}/2000 characters
                        </p>
                    </div>

                    {/* Factor Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="factor">Category *</Label>
                        <Select
                            value={formData.factor}
                            onValueChange={(value) => setFormData({ ...formData, factor: value })}
                            disabled={loading}
                        >
                            <SelectTrigger id="factor">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {FACTORS.map((factor) => (
                                    <SelectItem key={factor.value} value={factor.value}>
                                        {factor.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Author Name (Optional) */}
                    <div className="space-y-2">
                        <Label htmlFor="authorName">Your Name (Optional)</Label>
                        <input
                            id="authorName"
                            type="text"
                            placeholder="Anonymous"
                            value={formData.authorName}
                            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                            disabled={loading}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            maxLength={100}
                        />
                    </div>

                    {/* Author Class (Optional) */}
                    <div className="space-y-2">
                        <Label htmlFor="authorClass">Class/Batch (Optional)</Label>
                        <input
                            id="authorClass"
                            type="text"
                            placeholder="e.g., Class of 2024"
                            value={formData.authorClass}
                            onChange={(e) => setFormData({ ...formData, authorClass: e.target.value })}
                            disabled={loading}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            maxLength={50}
                        />
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Success Alert */}
                    {success && (
                        <Alert className="border-green-500 bg-green-50 text-green-900">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertDescription>
                                Review submitted successfully! Our AI has predicted your rating.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Submit Button */}
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            'Submit Review'
                        )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                        * Required fields. Your rating will be automatically predicted based on your review.
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
