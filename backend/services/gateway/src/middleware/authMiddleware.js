import jwt from 'jsonwebtoken';
import { serviceClient } from '../utils/serviceClient.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);

    // Verify with auth service first (source of truth)
    try {
      const user = await serviceClient.get('auth', '/api/auth/verify', {}, {
        'Authorization': `Bearer ${token}`
      });
      req.user = {
        ...user,
        id: user.id || user.sub
      };
      return next();
    } catch (error) {
      // If auth service explicitly rejects the token, fail immediately.
      if (error?.status === 401) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }

      // Fallback to local verification only when auth service is unavailable.
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
          ...decoded,
          id: decoded.id || decoded.sub,
          role: decoded.role || 'student'
        };
      } catch {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

/**
 * Optional authentication middleware
 * Attaches user if token is valid, but doesn't block if missing
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    // Silently ignore auth errors for optional auth
  }
  next();
};

/**
 * Admin role middleware
 * Requires user to have admin role
 */
export const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
};

/**
 * Role-based middleware factory
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        required: allowedRoles,
        current: req.user.role
      });
    }

    next();
  };
};