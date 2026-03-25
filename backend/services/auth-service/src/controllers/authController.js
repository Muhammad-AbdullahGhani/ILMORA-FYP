// auth-service/src/controllers/authController.js
import { authenticate, register as registerUser } from '../services/authService.js';
import { signToken, verifyToken } from '../utils/tokenManager.js';
export const login = async (req, res) => {
  // Accept either email or username for login
  const identifier = req.body.email || req.body.username;
  const password = req.body.password;
  if (!identifier || !password) return res.status(400).json({
    error: 'email/username and password required'
  });
  const user = await authenticate(identifier, password);
  if (!user) return res.status(401).json({
    error: 'invalid credentials'
  });
  const token = signToken({
    sub: user.id,
    username: user.username,
    role: user.role || 'student'
  });
  return res.json({
    token,
    user
  });
};
export const register = async (req, res) => {
  const {
    email,
    password,
    name
  } = req.body;
  if (!email || !password || !name) return res.status(400).json({
    error: 'email, password and name required'
  });
  try {
    const user = await registerUser(email, password, name);
    const token = signToken({
      sub: user.id,
      username: user.email || user.username,
      role: user.role || 'student'
    });
    return res.status(201).json({
      token,
      user
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message || 'Registration failed'
    });
  }
};

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    return res.json({
      id: decoded.sub,
      username: decoded.username,
      role: decoded.role || 'student'
    });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};