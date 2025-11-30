import React from 'react';
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Star, ThumbsUp } from "lucide-react";

export function ReviewCard({ review, onLike }) {
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star key={`full-${i}`} className="w-4 h-4 fill-current text-yellow-500" />
            );
        }

        if (hasHalfStar && fullStars < 5) {
            stars.push(
                <Star key="half" className="w-4 h-4 fill-current text-yellow-500 opacity-50" />
            );
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
            );
        }

        return stars;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getFactorColor = (factor) => {
        const colors = {
            'Academics': 'bg-blue-100 text-blue-800',
            'Faculty': 'bg-purple-100 text-purple-800',
            'Campus Life': 'bg-green-100 text-green-800',
            'Facilities': 'bg-orange-100 text-orange-800',
            'Placements': 'bg-pink-100 text-pink-800',
            'General': 'bg-gray-100 text-gray-800'
        };
        return colors[factor] || colors['General'];
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                {/* Header: Stars and Factor */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            {renderStars(review.rating)}
                        </div>
                        <span className="text-sm font-semibold text-muted-foreground">
                            {review.rating.toFixed(1)}
                        </span>
                    </div>
                    <Badge className={getFactorColor(review.factor)} variant="secondary">
                        {review.factor}
                    </Badge>
                </div>

                {/* Review Text */}
                <p className="text-sm text-foreground leading-relaxed mb-3">
                    {review.review_text}
                </p>

                {/* Footer: Author and Actions */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">
                            {review.authorName || 'Anonymous'}
                        </span>
                        {review.authorClass && (
                            <>
                                <span>•</span>
                                <span>{review.authorClass}</span>
                            </>
                        )}
                        <span>•</span>
                        <span>{formatDate(review.createdAt)}</span>
                    </div>

                    {/* Like Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 hover:bg-muted"
                        onClick={() => onLike && onLike(review._id || review.id)}
                    >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        <span>{review.helpful_count || 0}</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
