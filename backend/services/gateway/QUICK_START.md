# 🚀 Quick Start Guide - ILM-ORA API Gateway

## Gateway is Running! ✅

Your API Gateway is successfully running on **port 3000** with all microservices registered.

## What You Can Do Now

### 1. Test the Gateway

```bash
# Check gateway health
curl http://localhost:3000/health

# Get universities through gateway
curl http://localhost:3000/api/universities

# Test authentication endpoints
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

### 2. Start Other Services

To enable full functionality, start your microservices:

```bash
# Start auth service
cd backend/services/auth-service
npm run dev

# Start university service (already has data)
cd backend/services/university-service
npm install
npm run dev

# Start other services as needed
cd backend/services/quiz-service && npm run dev
cd backend/services/recommendation-service && npm run dev
cd backend/services/sentiment-service && npm run dev
cd backend/services/career-service && npm run dev
cd backend/services/admin-service && npm run dev
```

### 3. Use Frontend with Gateway

Your frontend is already configured to use the gateway! Just start it:

```bash
cd frontend
npm run dev
```

All API calls will automatically route through the gateway at `http://localhost:3000/api/*`

## Service Communication Examples

### From Frontend (JavaScript/React)

```javascript
// Universities
const response = await fetch('/api/universities');
const data = await response.json();

// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

// Protected endpoint with auth
const response = await fetch('/api/recommendations/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ preferences })
});
```

### From Backend (Service-to-Service)

```javascript
import { serviceClient } from './utils/serviceClient.js';

// Get data from another service
const universities = await serviceClient.get('university', '/api/universities');

// Post data to another service
const result = await serviceClient.post('quiz', '/api/quiz/submit', {
  answers: [...]
});

// With user context
const data = await serviceClient.forwardWithAuth('recommendation', {
  method: 'GET',
  path: '/api/recommendations/user'
}, req.user);
```

## Available Endpoints

### Public Endpoints
- `GET /health` - Gateway health check
- `GET /api` - API information
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/universities` - List universities
- `GET /api/universities/:id` - University details
- `GET /api/sentiment/university/:id` - University sentiment
- `GET /api/careers` - List careers
- `GET /api/quiz` - List quizzes

### Protected Endpoints (Require Authentication)
- `GET /api/auth/me` - Current user
- `POST /api/quiz/:id/submit` - Submit quiz
- `POST /api/recommendations/generate` - Generate recommendations
- `GET /api/recommendations/user` - User recommendations
- `POST /api/universities/:id/favorite` - Add favorite
- `GET /api/universities/user/favorites` - Get favorites

### Admin Endpoints (Require Admin Role)
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/users` - List users
- `GET /api/admin/analytics` - System analytics

## Troubleshooting

### Gateway Not Starting?
```bash
# Check if port 3000 is available
netstat -an | findstr :3000

# Kill process if needed and restart
npm run dev
```

### Service Communication Failing?
1. Ensure the target service is running on its configured port
2. Check service URLs in `.env` file
3. Verify network connectivity between services
4. Check service logs for errors

### Authentication Issues?
1. Ensure JWT_SECRET is consistent across services
2. Verify token is being sent in Authorization header
3. Check token hasn't expired
4. Confirm auth service is running

## Configuration

### Environment Variables (.env)
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3001

# Service URLs
AUTH_SERVICE_URL=http://localhost:3001
QUIZ_SERVICE_URL=http://localhost:3002
RECOMMENDATION_SERVICE_URL=http://localhost:3003
SENTIMENT_SERVICE_URL=http://localhost:3004
UNIVERSITY_SERVICE_URL=http://localhost:3005
CAREER_SERVICE_URL=http://localhost:3006
ADMIN_SERVICE_URL=http://localhost:3007
```

### Rate Limiting
- General endpoints: 100 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes
- Health checks: No limit

## Monitoring

### View Logs
The gateway logs all requests:
```
[2025-12-04T10:30:00.000Z] GET /api/universities
[2025-12-04T10:30:00.150Z] GET /api/universities - 200 (150ms)
```

### Check Service Health
```bash
curl http://localhost:3000/health
```

Returns:
```json
{
  "status": "ok",
  "gateway": "healthy",
  "timestamp": "2025-12-04T10:30:00.000Z",
  "services": {
    "auth": "http://localhost:3001",
    "quiz": "http://localhost:3002",
    ...
  }
}
```

## Production Deployment

### Using Docker Compose
```bash
# Build and start all services
docker-compose up --build

# Services will communicate using container names
```

### Environment for Production
```env
NODE_ENV=production
PORT=3000
JWT_SECRET=strong-random-secret-here

# Use internal service names for Docker
AUTH_SERVICE_URL=http://auth-service:3001
QUIZ_SERVICE_URL=http://quiz-service:3002
...
```

## Next Steps

1. ✅ Gateway is running
2. Start your microservices (at least auth and university)
3. Test endpoints using curl or Postman
4. Start frontend and verify integration
5. Implement remaining service endpoints
6. Add authentication to your services
7. Deploy to production

## Support

For issues or questions, check:
- Gateway logs in terminal
- Service-specific logs
- Network connectivity between services
- Environment variable configuration

---

**Gateway Status**: 🟢 Running on port 3000
**Services Registered**: 7 microservices
**Ready for Production**: Add proper environment variables and secrets
