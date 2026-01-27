/**
 * Example: Inter-service Communication
 * 
 * This file demonstrates how services can communicate with each other
 * through the gateway's service client utility
 */

import { serviceClient } from '../utils/serviceClient.js';

/**
 * Example 1: Quiz service calling University service
 * When generating recommendations, quiz service might need university data
 */
export async function generateQuizRecommendations(quizResults, userId) {
  try {
    // Get universities from university service
    const universities = await serviceClient.get('university', '/api/universities', {
      filter: 'top-rated',
      limit: 20
    });

    // Get user preferences from recommendation service
    const preferences = await serviceClient.get(
      'recommendation',
      `/api/recommendations/user/${userId}/preferences`
    );

    // Combine data and return
    return {
      quizResults,
      universities,
      preferences,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating quiz recommendations:', error);
    throw error;
  }
}

/**
 * Example 2: Recommendation service calling multiple services
 * Generate comprehensive degree recommendations
 */
export async function generateDegreeRecommendations(userId, userToken) {
  try {
    // Get user quiz results from quiz service
    const quizHistory = await serviceClient.get(
      'quiz',
      '/api/quiz/user/history',
      {},
      { Authorization: `Bearer ${userToken}` }
    );

    // Get career data from career service
    const careers = await serviceClient.get('career', '/api/careers', {
      category: 'technology'
    });

    // Get universities offering relevant programs
    const universities = await serviceClient.post(
      'university',
      '/api/universities/search',
      {
        programs: ['Computer Science', 'Engineering'],
        location: 'Pakistan'
      }
    );

    // Get sentiment analysis for top universities
    const universityIds = universities.slice(0, 5).map(u => u.id);
    const sentimentPromises = universityIds.map(id =>
      serviceClient.get('sentiment', `/api/sentiment/university/${id}`)
    );
    const sentiments = await Promise.all(sentimentPromises);

    // Combine all data
    return {
      userId,
      quizResults: quizHistory[0], // Latest quiz
      matchedCareers: careers.slice(0, 10),
      universities: universities.map((uni, idx) => ({
        ...uni,
        sentiment: sentiments[idx]
      })),
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating degree recommendations:', error);
    throw error;
  }
}

/**
 * Example 3: Admin service aggregating data from all services
 */
export async function getSystemAnalytics() {
  try {
    // Run health checks on all services
    const healthChecks = await Promise.allSettled([
      serviceClient.checkHealth('auth'),
      serviceClient.checkHealth('quiz'),
      serviceClient.checkHealth('recommendation'),
      serviceClient.checkHealth('sentiment'),
      serviceClient.checkHealth('university'),
      serviceClient.checkHealth('career')
    ]);

    // Get user count from auth service
    const userStats = await serviceClient.get('auth', '/api/auth/stats');

    // Get quiz completion stats
    const quizStats = await serviceClient.get('quiz', '/api/quiz/stats');

    // Get university data stats
    const universityStats = await serviceClient.get('university', '/api/universities/stats');

    return {
      timestamp: new Date().toISOString(),
      services: {
        auth: healthChecks[0].status === 'fulfilled' ? 'healthy' : 'unhealthy',
        quiz: healthChecks[1].status === 'fulfilled' ? 'healthy' : 'unhealthy',
        recommendation: healthChecks[2].status === 'fulfilled' ? 'healthy' : 'unhealthy',
        sentiment: healthChecks[3].status === 'fulfilled' ? 'healthy' : 'unhealthy',
        university: healthChecks[4].status === 'fulfilled' ? 'healthy' : 'unhealthy',
        career: healthChecks[5].status === 'fulfilled' ? 'healthy' : 'unhealthy'
      },
      stats: {
        users: userStats,
        quizzes: quizStats,
        universities: universityStats
      }
    };
  } catch (error) {
    console.error('Error getting system analytics:', error);
    throw error;
  }
}

/**
 * Example 4: University service enriching data with sentiment
 */
export async function getUniversityWithSentiment(universityId) {
  try {
    // Get base university data
    const university = await serviceClient.get(
      'university',
      `/api/universities/${universityId}`
    );

    // Get sentiment analysis
    const sentiment = await serviceClient.get(
      'sentiment',
      `/api/sentiment/university/${universityId}`
    );

    // Get related careers for programs offered
    const careerPromises = university.programs?.slice(0, 3).map(program =>
      serviceClient.get('career', '/api/careers/search', {
        keyword: program.name
      })
    ) || [];

    const careers = await Promise.all(careerPromises);

    return {
      ...university,
      sentiment,
      relatedCareers: careers.flat(),
      enrichedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error enriching university data:', error);
    throw error;
  }
}

/**
 * Example 5: Forwarding authenticated requests
 * Preserving user context across services
 */
export async function getUserDashboardData(req) {
  try {
    const { user } = req; // From auth middleware

    // Forward authenticated requests to various services
    const [profile, quizzes, recommendations, favorites] = await Promise.all([
      serviceClient.forwardWithAuth(
        'auth',
        { method: 'GET', path: '/api/auth/me' },
        user
      ),
      serviceClient.forwardWithAuth(
        'quiz',
        { method: 'GET', path: '/api/quiz/user/history' },
        user
      ),
      serviceClient.forwardWithAuth(
        'recommendation',
        { method: 'GET', path: '/api/recommendations/user' },
        user
      ),
      serviceClient.forwardWithAuth(
        'university',
        { method: 'GET', path: '/api/universities/user/favorites' },
        user
      )
    ]);

    return {
      profile,
      recentQuizzes: quizzes.slice(0, 5),
      recommendations: recommendations.slice(0, 10),
      favoriteUniversities: favorites
    };
  } catch (error) {
    console.error('Error getting user dashboard:', error);
    throw error;
  }
}
