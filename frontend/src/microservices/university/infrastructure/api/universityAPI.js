const API_BASE_URL = import.meta.env.VITE_UNIVERSITY_SERVICE_URL || 'http://localhost:3005';

/**
 * Fetch review statistics for a university
 * @param {string} universityName - Name of the university
 * @returns {Promise<Object>} Statistics object with ratings and distributions
 */
export async function fetchReviewStats(universityName) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/reviews/${encodeURIComponent(universityName)}/stats`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.stats;
  } catch (error) {
    console.error('Error fetching review stats:', error);
    throw error;
  }
}

/**
 * Fetch reviews for a university with pagination
 * @param {string} universityName - Name of the university
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Reviews and pagination data
 */
export async function fetchReviews(universityName, options = {}) {
  const {
    page = 1,
    limit = 10,
    factor = null,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = options;

  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder
    });

    if (factor && factor !== 'all') {
      params.append('factor', factor);
    }

    const response = await fetch(
      `${API_BASE_URL}/api/reviews/${encodeURIComponent(universityName)}?${params}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
}

/**
 * Like a review
 * @param {string} reviewId - ID of the review to like
 * @returns {Promise<Object>} Updated helpful count
 */
export async function likeReview(reviewId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/reviews/${reviewId}/like`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error liking review:', error);
    throw error;
  }
}