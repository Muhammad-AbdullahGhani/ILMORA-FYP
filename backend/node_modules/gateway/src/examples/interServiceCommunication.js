/**
 * Example: Inter-Service Communication
 * 
 * This example demonstrates how microservices can communicate with each other
 * through the API Gateway's service client.
 */

import { serviceClient } from '../utils/serviceClient.js';

/**
 * Example 1: Recommendation Service calling University Service
 * When generating recommendations, fetch university details
 */
export async function generateRecommendationsWithUniversityData(userId, preferences) {
  try {
    // Step 1: Get user's quiz results from quiz service
    const quizResults = await serviceClient.get('quiz', `/api/quiz/user/${userId}/latest`);
    
    // Step 2: Generate recommendations based on quiz results
    const recommendations = await serviceClient.post('recommendation', '/api/recommendations/generate', {
      userId,
      preferences,
      quizResults
    });
    
    // Step 3: Enrich recommendations with university details
    const enrichedRecommendations = await Promise.all(
      recommendations.universities.map(async (rec) => {
        const universityDetails = await serviceClient.get('university', `/api/universities/${rec.id}`);
        const sentiment = await serviceClient.get('sentiment', `/api/sentiment/university/${rec.id}`);
        
        return {
          ...rec,
          details: universityDetails,
          sentiment: sentiment.overall
        };
      })
    );
    
    return enrichedRecommendations;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
}

/**
 * Example 2: University Service calling Sentiment Service
 * When fetching university details, include sentiment analysis
 */
export async function getUniversityWithSentiment(universityId) {
  try {
    // Fetch university and sentiment data in parallel
    const [university, sentiment] = await Promise.all([
      serviceClient.get('university', `/api/universities/${universityId}`),
      serviceClient.get('sentiment', `/api/sentiment/university/${universityId}`)
    ]);
    
    return {
      ...university,
      sentimentAnalysis: sentiment,
      overallRating: sentiment.overall
    };
  } catch (error) {
    console.error('Error fetching university with sentiment:', error);
    throw error;
  }
}

/**
 * Example 3: Admin Service aggregating data from multiple services
 * Dashboard showing system-wide statistics
 */
export async function getAdminDashboardData() {
  try {
    const [users, quizStats, universityStats, recommendations] = await Promise.all([
      serviceClient.get('auth', '/api/auth/stats'),
      serviceClient.get('quiz', '/api/quiz/stats'),
      serviceClient.get('university', '/api/universities/stats'),
      serviceClient.get('recommendation', '/api/recommendations/stats')
    ]);
    
    return {
      totalUsers: users.total,
      activeUsers: users.active,
      quizzesTaken: quizStats.total,
      averageScore: quizStats.averageScore,
      totalUniversities: universityStats.total,
      recommendationsGenerated: recommendations.total,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
}

/**
 * Example 4: Authenticated inter-service call
 * Forward user context when making requests
 */
export async function getUserRecommendationsWithAuth(req) {
  try {
    // Forward the authenticated user context
    const recommendations = await serviceClient.forwardWithAuth(
      'recommendation',
      {
        method: 'GET',
        path: '/api/recommendations/user',
        params: { include: 'details' }
      },
      req.user
    );
    
    // Enrich with additional data
    const enrichedData = await Promise.all(
      recommendations.map(async (rec) => {
        const [university, career] = await Promise.all([
          serviceClient.get('university', `/api/universities/${rec.universityId}`),
          serviceClient.get('career', `/api/careers/${rec.careerPath}`)
        ]);
        
        return {
          ...rec,
          university,
          career
        };
      })
    );
    
    return enrichedData;
  } catch (error) {
    console.error('Error fetching user recommendations:', error);
    throw error;
  }
}

/**
 * Example 5: Error handling in service communication
 * Graceful degradation when services are unavailable
 */
export async function getUniversityListWithFallback() {
  try {
    // Try to get universities with sentiment
    const universities = await serviceClient.get('university', '/api/universities');
    
    // Try to enrich with sentiment, but don't fail if sentiment service is down
    const enrichedUniversities = await Promise.all(
      universities.map(async (uni) => {
        try {
          const sentiment = await serviceClient.get('sentiment', `/api/sentiment/university/${uni.id}`);
          return { ...uni, sentiment };
        } catch (error) {
          console.warn(`Could not fetch sentiment for ${uni.name}:`, error.message);
          return { ...uni, sentiment: null };
        }
      })
    );
    
    return enrichedUniversities;
  } catch (error) {
    console.error('Error fetching universities:', error);
    throw error;
  }
}

/**
 * Example 6: Health check across all services
 * Verify all microservices are operational
 */
export async function checkAllServicesHealth() {
  const services = ['auth', 'quiz', 'recommendation', 'sentiment', 'university', 'career', 'admin'];
  
  const healthChecks = await Promise.all(
    services.map(async (service) => {
      const isHealthy = await serviceClient.checkHealth(service);
      return {
        service,
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString()
      };
    })
  );
  
  return {
    overall: healthChecks.every(check => check.status === 'healthy') ? 'healthy' : 'degraded',
    services: healthChecks
  };
}
