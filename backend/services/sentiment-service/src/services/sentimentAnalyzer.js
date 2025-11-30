// src/services/sentimentAnalyzer.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { pipeline, Pipeline } from '@xenova/transformers';
import { round } from 'lodash';

interface ReviewInput {
  review_text: string;
  factor: string;
  university: string;
  city: string;
}

interface AnalysisResult {
  overallRating: number;
  ratingBreakdown: number[]; // [Academics, Faculty, Campus Life, Facilities, Placements]
  reviewDistribution: { 1: number; 2: number; 3: number; 4: number; 5: number };
  totalReviews: number;
}

@Injectable()
export class SentimentAnalyzerService implements OnModuleInit {
  private classifier!: Pipeline;

  private readonly FACTOR_MAP: Record<string, string> = {
    academics: 'Academics',
    faculty: 'Faculty',
    'campus life': 'Campus Life',
    facilities: 'Facilities',
    infrastructure: 'Facilities',
    hostel: 'Facilities',
    hostels: 'Facilities',
    placements: 'Placements',
    placement: 'Placements',
    career: 'Placements',
    jobs: 'Placements',
  };

  async onModuleInit() {
    // This loads the model once when the service starts
    // Replace with your actual HF username/model
    this.classifier = await pipeline(
      'text-classification',
      'your-username/nust-sentiment-deberta', // CHANGE THIS
      {
        quantized: true,
        revision: 'main',
      },
    );
    console.log('Sentiment model loaded successfully');
  }

  private normalizeFactor(rawFactor: string): string {
    const lower = rawFactor.toLowerCase().trim();
    for (const key in this.FACTOR_MAP) {
      if (lower.includes(key)) {
        return this.FACTOR_MAP[key];
      }
    }
    return 'General';
  }

  private async predictSingle(review: ReviewInput): Promise<number> {
    const factor = this.normalizeFactor(review.factor);
    const inputText = `[${factor}] (${review.university}, ${review.city}): ${review.review_text}`;

    const result = await this.classifier(inputText);
    // Your model returns regression score directly (not label)
    let score = typeof result.score === 'number' ? result.score : parseFloat(result.label || result.score);

    return Math.max(1.0, Math.min(5.0, round(score, 2)));
  }

  async analyzeUniversityReviews(reviews: ReviewInput[]): Promise<AnalysisResult> {
    if (reviews.length === 0) {
      return {
        overallRating: 0,
        ratingBreakdown: [0, 0, 0, 0, 0],
        reviewDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        totalReviews: 0,
      };
    }

    const predictions = await Promise.all(reviews.map(r => this.predictSingle(r)));

    const factorGroups: Record<string, number[]> = {};
    predictions.forEach((pred, i) => {
      const factor = this.normalizeFactor(reviews[i].factor);
      if (!factorGroups[factor]) factorGroups[factor] = [];
      factorGroups[factor].push(pred);
    });

    const orderedFactors = ['Academics', 'Faculty', 'Campus Life', 'Facilities', 'Placements'];
    const ratingBreakdown = orderedFactors.map(f =>
      factorGroups[f] ? round(factorGroups[f].reduce((a, b) => a + b, 0) / factorGroups[f].length, 2) : 0,
    );

    const overallRating = round(predictions.reduce((a, b) => a + b, 0) / predictions.length, 2);

    const starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    predictions.forEach(p => {
      const star = Math.round(p);
      if (star >= 1 && star <= 5) starCounts[star]++;
    });

    const total = predictions.length;
    const reviewDistribution = {
      5: round((starCounts[5] / total) * 100, 1),
      4: round((starCounts[4] / total) * 100, 1),
      3: round((starCounts[3] / total) * 100, 1),
      2: round((starCounts[2] / total) * 100, 1),
      1: round((starCounts[1] / total) * 100, 1),
    };

    return {
      overallRating,
      ratingBreakdown,
      reviewDistribution,
      totalReviews: total,
    };
  }
}