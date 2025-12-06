/**
 * Service Registry
 * Manages service URLs and provides service discovery
 */
class ServiceRegistry {
  constructor() {
    this.services = {
      auth: {
        name: 'auth-service',
        url: process.env.AUTH_SERVICE_URL || 'http://localhost:3008',
        healthEndpoint: '/health'
      },
      quiz: {
        name: 'quiz-service',
        url: process.env.QUIZ_SERVICE_URL || 'http://localhost:3002',
        healthEndpoint: '/health'
      },
      recommendation: {
        name: 'recommendation-service',
        url: process.env.RECOMMENDATION_SERVICE_URL || 'http://localhost:3003',
        healthEndpoint: '/health'
      },
      sentiment: {
        name: 'sentiment-service',
        url: process.env.SENTIMENT_SERVICE_URL || 'http://localhost:3004',
        healthEndpoint: '/health'
      },
      university: {
        name: 'university-service',
        url: process.env.UNIVERSITY_SERVICE_URL || 'http://localhost:3005',
        healthEndpoint: '/health'
      },
      career: {
        name: 'career-service',
        url: process.env.CAREER_SERVICE_URL || 'http://localhost:3006',
        healthEndpoint: '/health'
      },
      admin: {
        name: 'admin-service',
        url: process.env.ADMIN_SERVICE_URL || 'http://localhost:3007',
        healthEndpoint: '/health'
      }
    };
  }

  /**
   * Get service configuration by key
   */
  getService(key) {
    return this.services[key];
  }

  /**
   * Get all registered services
   */
  getAll() {
    return this.services;
  }

  /**
   * Update service URL dynamically
   */
  updateService(key, url) {
    if (this.services[key]) {
      this.services[key].url = url;
    }
  }

  /**
   * Check if service is registered
   */
  hasService(key) {
    return !!this.services[key];
  }
}

export const serviceRegistry = new ServiceRegistry();
