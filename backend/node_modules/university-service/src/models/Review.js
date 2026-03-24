
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  // Review content
  review_text: {
    type: String,
    required: [true, 'Review text is required'],
    minlength: [10, 'Review must be at least 10 characters long'],
    maxlength: [2000, 'Review cannot exceed 2000 characters'],
    trim: true
  },

  // Model-predicted rating
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1.0, 'Rating must be at least 1.0'],
    max: [5.0, 'Rating cannot exceed 5.0']
  },

  // Review metadata
  factor: {
    type: String,
    required: [true, 'Factor is required'],
    enum: {
      values: [
        'Academics', 'Faculty', 'Campus Life', 'Facilities', 'Placements', 'General',
        'Sports', 'Cafeteria', 'Labs', 'Resources', 'Housing', 'Aid',
        'Management', 'Campus', 'Hostels', 'Job Support', 'Events'
      ],
      message: '{VALUE} is not a valid factor'
    }
  },

  university: {
    type: String,
    required: [true, 'University name is required'],
    trim: true,
    index: true  // Index for fast queries by university
  },

  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },

  // Author information
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false  // Optional - can be anonymous
  },

  authorName: {
    type: String,
    default: 'Anonymous',
    trim: true
  },

  authorClass: {
    type: String,  // e.g., "Class of 2024"
    trim: true
  },

  // Engagement metrics
  helpful_count: {
    type: Number,
    default: 0,
    min: 0
  },

  // Moderation
  isApproved: {
    type: Boolean,
    default: true  // Auto-approve for now, can add moderation later
  },

  isReported: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});

// Compound index for efficient queries
reviewSchema.index({ university: 1, factor: 1 });
reviewSchema.index({ university: 1, createdAt: -1 });  // For sorting by date

// Virtual for formatted date
reviewSchema.virtual('formattedDate').get(function () {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
});

// Instance method to increment helpful count
reviewSchema.methods.incrementHelpful = async function () {
  this.helpful_count += 1;
  return this.save();
};

// Helper to escape regex special characters
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Static method to get reviews by university with pagination
reviewSchema.statics.getByUniversity = function (universityName, options = {}) {
  const {
    page = 1,
    limit = 10,
    factor = null,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = options;

  // Sanitize name: escape special chars and allow flexible hyphen/space matching
  const sanitizedName = escapeRegExp(universityName).replace(/[\s\-]+/g, '[\\s\\-]+');

  const query = {
    university: { $regex: new RegExp(`^${sanitizedName}$`, 'i') },
    isApproved: true
  };

  if (factor && factor !== 'all') {
    query.factor = factor;
  }

  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

  return this.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('author', 'name')
    .lean();
};

// Static method to calculate review statistics for a university
reviewSchema.statics.getStatsByUniversity = async function (universityName) {
  // Sanitize name: escape special chars and allow flexible hyphen/space matching
  const sanitizedName = escapeRegExp(universityName).replace(/[\s\-]+/g, '[\\s\\-]+');

  const reviews = await this.find({
    university: { $regex: new RegExp(`^${sanitizedName}$`, 'i') },
    isApproved: true
  }).lean();

  if (reviews.length === 0) {
    return {
      overall_rating: 0,
      total_reviews: 0,
      rating_breakdown: {},
      review_distribution: {}
    };
  }

  // Calculate average rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const overall_rating = Number((totalRating / reviews.length).toFixed(1));

  // Calculate rating breakdown by factor
  const rating_breakdown = {};
  const factorCounts = {};

  reviews.forEach(review => {
    if (!rating_breakdown[review.factor]) {
      rating_breakdown[review.factor] = 0;
      factorCounts[review.factor] = 0;
    }
    rating_breakdown[review.factor] += review.rating;
    factorCounts[review.factor]++;
  });

  Object.keys(rating_breakdown).forEach(factor => {
    rating_breakdown[factor] = Number((rating_breakdown[factor] / factorCounts[factor]).toFixed(1));
  });

  // Calculate review distribution
  const review_distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach(review => {
    const roundedRating = Math.round(review.rating);
    if (review_distribution[roundedRating] !== undefined) {
      review_distribution[roundedRating]++;
    }
  });

  // Convert distribution to percentages
  Object.keys(review_distribution).forEach(rating => {
    review_distribution[rating] = Number(((review_distribution[rating] / reviews.length) * 100).toFixed(1));
  });

  return {
    overall_rating,
    total_reviews: reviews.length,
    rating_breakdown,
    review_distribution
  };
};

// Ensure virtuals are included in JSON
reviewSchema.set('toJSON', { virtuals: true });
reviewSchema.set('toObject', { virtuals: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
