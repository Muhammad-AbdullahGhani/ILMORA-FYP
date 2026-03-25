import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ilm-ora';

const userSchema = new mongoose.Schema({}, { strict: false, collection: 'users' });
const universitySchema = new mongoose.Schema({}, { strict: false, collection: 'universities' });
const reviewSchema = new mongoose.Schema({}, { strict: false, collection: 'reviews' });
const auditSchema = new mongoose.Schema({}, { strict: false, collection: 'admin_audit_logs' });

const User = mongoose.model('AdminUser', userSchema);
const University = mongoose.model('AdminUniversity', universitySchema);
const Review = mongoose.model('AdminReview', reviewSchema);
const AuditLog = mongoose.model('AdminAuditLog', auditSchema);

const asObjectId = (id) => (mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null);
const MAX_PAGE_SIZE = 100;

const getActorFromRequest = (req) => ({
  id: req.headers['x-user-id'] || 'unknown',
  email: req.headers['x-user-email'] || null,
  role: req.headers['x-user-role'] || 'admin'
});

const normalizeModerationStatus = (review) => {
  if (review?.moderationStatus) return String(review.moderationStatus).toLowerCase();
  if (review?.isApproved === true) return 'approved';
  if (review?.isApproved === false) return 'pending';
  return 'pending';
};

const writeAuditLog = async ({ req, action, targetType, targetId = null, details = {} }) => {
  try {
    if (mongoose.connection.readyState !== 1) return;
    const actor = getActorFromRequest(req);
    await AuditLog.create({
      actor,
      action,
      targetType,
      targetId,
      details,
      createdAt: new Date()
    });
  } catch (error) {
    console.warn('Failed to write audit log:', error.message);
  }
};

async function getServiceHealth() {
  return [{
    name: 'mongodb',
    status: mongoose.connection.readyState === 1 ? 'ok' : 'degraded'
  }];
}

async function getDashboardStats() {
  if (mongoose.connection.readyState !== 1) {
    return { users: 0, universities: 0, reviews: 0 };
  }

  const [users, universities, reviews] = await Promise.all([
    User.countDocuments(),
    University.countDocuments(),
    Review.countDocuments()
  ]);

  return { users, universities, reviews };
}

async function getRoleBreakdown() {
  if (mongoose.connection.readyState !== 1) {
    return { admin: 0, student: 0, unknown: 0 };
  }

  const pipeline = [
    {
      $group: {
        _id: { $ifNull: ['$role', 'unknown'] },
        count: { $sum: 1 }
      }
    }
  ];
  const grouped = await User.aggregate(pipeline);
  return grouped.reduce((acc, item) => {
    const key = String(item._id || 'unknown').toLowerCase();
    acc[key] = item.count;
    return acc;
  }, { admin: 0, student: 0, unknown: 0 });
}

async function getRecentUsers(limit = 8) {
  if (mongoose.connection.readyState !== 1) {
    return [];
  }

  return User.find({}, { email: 1, name: 1, role: 1, createdAt: 1 })
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit)
    .lean();
}

async function getCollectionCount(collectionName, fallback = 0) {
  try {
    if (mongoose.connection.readyState !== 1) return fallback;
    const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();
    if (!collections.length) return fallback;
    return mongoose.connection.db.collection(collectionName).countDocuments();
  } catch {
    return fallback;
  }
}

async function getCollectionCountAny(collectionNames = []) {
  for (const name of collectionNames) {
    const count = await getCollectionCount(name, null);
    if (count !== null) return count;
  }
  return 0;
}

const getPastDays = (days = 7) => {
  const values = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    values.push(d);
  }
  return values;
};

async function buildDailyTrend(model, label, days = 7, extraMatch = {}) {
  if (mongoose.connection.readyState !== 1) {
    return getPastDays(days).map((d) => ({
      date: d.toISOString().slice(0, 10),
      [label]: 0
    }));
  }

  const start = new Date();
  start.setDate(start.getDate() - (days - 1));
  start.setHours(0, 0, 0, 0);

  const rows = await model.aggregate([
    {
      $match: {
        createdAt: { $gte: start },
        ...extraMatch
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
        },
        count: { $sum: 1 }
      }
    }
  ]);

  const rowMap = rows.reduce((acc, row) => {
    acc[row._id] = row.count;
    return acc;
  }, {});

  return getPastDays(days).map((d) => {
    const date = d.toISOString().slice(0, 10);
    return {
      date,
      [label]: rowMap[date] || 0
    };
  });
}

async function getTopUniversities(limit = 5) {
  if (mongoose.connection.readyState !== 1) return [];
  const rows = await Review.aggregate([
    {
      $match: {
        university: { $exists: true, $ne: null, $ne: '' }
      }
    },
    {
      $group: {
        _id: '$university',
        reviewCount: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    },
    { $sort: { reviewCount: -1 } },
    { $limit: limit }
  ]);
  return rows.map((row) => ({
    university: row._id,
    reviewCount: row.reviewCount,
    avgRating: Number((row.avgRating || 0).toFixed(2))
  }));
}

async function getModerationMetrics() {
  if (mongoose.connection.readyState !== 1) {
    return { pending: 0, approved: 0, rejected: 0, reported: 0 };
  }
  const [pending, approved, rejected, reported] = await Promise.all([
    Review.countDocuments({
      $or: [
        { moderationStatus: 'pending' },
        { moderationStatus: { $exists: false }, isApproved: false },
        { moderationStatus: { $exists: false }, isApproved: { $exists: false } }
      ]
    }),
    Review.countDocuments({
      $or: [{ moderationStatus: 'approved' }, { moderationStatus: { $exists: false }, isApproved: true }]
    }),
    Review.countDocuments({ moderationStatus: 'rejected' }),
    Review.countDocuments({ isReported: true })
  ]);
  return { pending, approved, rejected, reported };
}

const buildAlerts = ({ services, moderation, stats }) => {
  const alerts = [];
  if (services.some((s) => s.status !== 'ok')) {
    alerts.push({
      severity: 'critical',
      title: 'Service degraded',
      message: 'One or more services are unhealthy.'
    });
  }
  if (moderation.pending > 20) {
    alerts.push({
      severity: 'warn',
      title: 'Moderation backlog high',
      message: `${moderation.pending} reviews are pending moderation.`
    });
  } else if (moderation.pending > 0) {
    alerts.push({
      severity: 'info',
      title: 'Pending moderation items',
      message: `${moderation.pending} reviews are waiting for review.`
    });
  }
  if (stats.users === 0) {
    alerts.push({
      severity: 'warn',
      title: 'No users recorded',
      message: 'User collection is empty or unavailable.'
    });
  }
  return alerts;
};

app.get('/health', (_req, res) => res.json({
  status: 'ok',
  service: 'admin-service'
}));

app.get('/api/admin/dashboard', async (_req, res) => {
  try {
    const [stats, services, roleBreakdown, recentUsers, moderation] = await Promise.all([
      getDashboardStats(),
      getServiceHealth(),
      getRoleBreakdown(),
      getRecentUsers(6),
      getModerationMetrics()
    ]);
    const alerts = buildAlerts({ services, moderation, stats });

    res.json({
      stats,
      services,
      insights: {
        roleBreakdown,
        recentUsers,
        moderation,
        alerts
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

app.get('/api/admin/users', async (_req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ users: [] });
    }
    const users = await User.find({}, { email: 1, name: 1, role: 1, createdAt: 1 }).limit(100).lean();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/admin/users/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.get('/api/admin/analytics', async (_req, res) => {
  try {
    const [stats, roleBreakdown, moderation, userTrend, reviewTrend, topUniversities] = await Promise.all([
      getDashboardStats(),
      getRoleBreakdown(),
      getModerationMetrics(),
      buildDailyTrend(User, 'users', 7),
      buildDailyTrend(Review, 'reviews', 7),
      getTopUniversities(5)
    ]);
    const quizCompleted = await getCollectionCountAny(['quiz_results', 'quizresults', 'quiz_attempts', 'quizAttempts']);
    const recommendationsViewed = await getCollectionCountAny(['recommendations', 'degree_recommendations']);
    const feedbackSubmitted = stats.reviews;
    const reviewPerUniversity = stats.universities > 0 ? Number((stats.reviews / stats.universities).toFixed(2)) : 0;
    const adminSharePct = stats.users > 0 ? Number((((roleBreakdown.admin || 0) / stats.users) * 100).toFixed(2)) : 0;

    res.json({
      analytics: {
        totals: stats,
        roleBreakdown,
        moderation,
        ratios: {
          reviewPerUniversity,
          adminSharePct
        },
        funnel: {
          registered: stats.users,
          quizCompleted,
          recommendationsViewed,
          feedbackSubmitted
        },
        trends: {
          usersByDay: userTrend,
          reviewsByDay: reviewTrend
        },
        topUniversities
      },
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

app.get('/api/admin/logs', async (_req, res) => {
  try {
    const [services, stats, moderation] = await Promise.all([
      getServiceHealth(),
      getDashboardStats(),
      getModerationMetrics()
    ]);
    const auditTail = mongoose.connection.readyState === 1
      ? await AuditLog.find({}, { action: 1, targetType: 1, details: 1, createdAt: 1 })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
      : [];
    const now = Date.now();
    const logs = [
      {
        level: 'info',
        message: `Dashboard totals computed: users=${stats.users}, universities=${stats.universities}, reviews=${stats.reviews}`,
        timestamp: new Date(now - 20000).toISOString()
      },
      {
        level: services.some((s) => s.status !== 'ok') ? 'warn' : 'info',
        message: `Service health snapshot captured (${services.map((s) => `${s.name}:${s.status}`).join(', ')})`,
        timestamp: new Date(now - 10000).toISOString()
      },
      {
        level: moderation.pending > 0 ? 'warn' : 'info',
        message: `Moderation queue snapshot (pending=${moderation.pending}, rejected=${moderation.rejected})`,
        timestamp: new Date(now).toISOString()
      }
    ];
    const mergedLogs = [
      ...logs,
      ...auditTail.map((entry) => ({
        level: 'info',
        message: `[AUDIT] ${entry.action} ${entry.targetType || ''}`.trim(),
        timestamp: entry.createdAt,
        details: entry.details || {}
      }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json({
      logs: mergedLogs,
      note: 'Production log aggregation is not configured in this local setup.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

app.patch('/api/admin/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const nextRole = String(req.body?.role || '').toLowerCase();
    if (!['admin', 'student'].includes(nextRole)) {
      return res.status(400).json({ error: 'Role must be either admin or student' });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    const currentUser = await User.findById(id).lean();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { role: nextRole } },
      { new: true, projection: { email: 1, name: 1, role: 1, createdAt: 1 } }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    await writeAuditLog({
      req,
      action: 'USER_ROLE_UPDATED',
      targetType: 'user',
      targetId: id,
      details: {
        previousRole: currentUser?.role || 'student',
        nextRole
      }
    });

    res.json({ user: updatedUser, message: `Role updated to ${nextRole}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

app.get('/api/admin/reviews/moderation', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ reviews: [], total: 0, page: 1, limit: 20 });
    }

    const page = Math.max(1, Number(req.query.page || 1));
    const requestedLimit = Number(req.query.limit || 20);
    const limit = Math.min(MAX_PAGE_SIZE, Math.max(1, requestedLimit));
    const status = String(req.query.status || 'pending').toLowerCase();

    const query = (() => {
      if (status === 'approved') {
        return {
          $or: [{ moderationStatus: 'approved' }, { moderationStatus: { $exists: false }, isApproved: true }]
        };
      }
      if (status === 'rejected') {
        return { moderationStatus: 'rejected' };
      }
      return {
        $or: [
          { moderationStatus: 'pending' },
          { moderationStatus: { $exists: false }, isApproved: false },
          { moderationStatus: { $exists: false }, isApproved: { $exists: false } }
        ]
      };
    })();

    const [reviews, total] = await Promise.all([
      Review.find(query)
        .sort({ createdAt: -1, _id: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Review.countDocuments(query)
    ]);

    res.json({
      reviews: reviews.map((review) => ({
        ...review,
        moderationStatus: normalizeModerationStatus(review)
      })),
      total,
      page,
      limit
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch moderation queue' });
  }
});

app.patch('/api/admin/reviews/:id/moderate', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const status = String(req.body?.status || '').toLowerCase();
    const reason = String(req.body?.reason || '').trim();

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Status must be approved, rejected, or pending' });
    }
    const objectId = asObjectId(reviewId);
    if (!objectId) {
      return res.status(400).json({ error: 'Invalid review id' });
    }

    const existing = await Review.findById(objectId).lean();
    if (!existing) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const actor = getActorFromRequest(req);
    const update = {
      moderationStatus: status,
      moderationReason: reason || null,
      moderatedAt: new Date(),
      moderatedBy: actor.id,
      isApproved: status === 'approved'
    };
    const updated = await Review.findByIdAndUpdate(objectId, { $set: update }, { new: true }).lean();

    await writeAuditLog({
      req,
      action: 'REVIEW_MODERATED',
      targetType: 'review',
      targetId: reviewId,
      details: {
        previousStatus: normalizeModerationStatus(existing),
        nextStatus: status,
        reason: reason || null
      }
    });

    res.json({
      review: {
        ...updated,
        moderationStatus: normalizeModerationStatus(updated)
      },
      message: `Review marked as ${status}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to moderate review' });
  }
});

app.post('/api/admin/reviews/moderate/bulk', async (req, res) => {
  try {
    const ids = Array.isArray(req.body?.ids) ? req.body.ids : [];
    const status = String(req.body?.status || '').toLowerCase();
    const reason = String(req.body?.reason || '').trim();

    if (!ids.length) {
      return res.status(400).json({ error: 'At least one review id is required' });
    }
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Status must be approved, rejected, or pending' });
    }

    const objectIds = ids.map(asObjectId).filter(Boolean);
    if (!objectIds.length) {
      return res.status(400).json({ error: 'No valid review ids provided' });
    }

    const actor = getActorFromRequest(req);
    const update = {
      moderationStatus: status,
      moderationReason: reason || null,
      moderatedAt: new Date(),
      moderatedBy: actor.id,
      isApproved: status === 'approved'
    };

    const result = await Review.updateMany({ _id: { $in: objectIds } }, { $set: update });

    await writeAuditLog({
      req,
      action: 'REVIEW_BULK_MODERATED',
      targetType: 'review',
      details: {
        status,
        count: result.modifiedCount,
        reason: reason || null
      }
    });

    res.json({
      modified: result.modifiedCount,
      requested: objectIds.length,
      message: `Bulk moderation applied: ${status}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to apply bulk moderation' });
  }
});

app.get('/api/admin/audit', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ entries: [], total: 0 });
    }
    const limit = Math.min(MAX_PAGE_SIZE, Math.max(1, Number(req.query.limit || 50)));
    const entries = await AuditLog.find({})
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit)
      .lean();
    const total = await AuditLog.countDocuments();
    res.json({ entries, total });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

app.post('/api/admin/audit/event', async (req, res) => {
  try {
    const action = String(req.body?.action || '').trim();
    const details = typeof req.body?.details === 'object' && req.body?.details !== null ? req.body.details : {};
    if (!action) {
      return res.status(400).json({ error: 'Action is required' });
    }
    await writeAuditLog({
      req,
      action,
      targetType: String(req.body?.targetType || 'system'),
      targetId: req.body?.targetId || null,
      details
    });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to write audit event' });
  }
});

const port = process.env.PORT || 3007;

mongoose.connect(MONGO_URI)
  .then(() => console.log('admin-service connected to MongoDB'))
  .catch((error) => console.warn('admin-service MongoDB connection failed:', error.message))
  .finally(() => {
    app.listen(port, () => console.log(`admin-service listening on ${port}`));
  });