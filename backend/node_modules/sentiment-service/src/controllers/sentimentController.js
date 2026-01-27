// src/controllers/sentimentController.ts
import { Controller, Post, Body } from '@nestjs/common';
import { SentimentAnalyzerService } from '../services/sentimentAnalyzer.service';

@Controller('sentiment')
export class SentimentController {
  constructor(private readonly sentimentService: SentimentAnalyzerService) {}

  @Post('analyze')
  async analyzeUniversity(@Body() body: { reviews: any[] }) {
    return await this.sentimentService.analyzeUniversityReviews(body.reviews);
  }
}