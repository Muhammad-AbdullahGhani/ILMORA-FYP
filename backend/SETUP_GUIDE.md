# ILM-ORA Microservices Setup Guide

This guide explains how to set up and run the complete ILM-ORA system with the API Gateway.

## Architecture Overview

```
Frontend (Port 3001)
       ↓
API Gateway (Port 3000)
       ↓
    ┌──────────────────────────────┐
    │   Microservices Network      │
    ├──────────────────────────────┤
    │ Auth Service        (3001)   │
    │ Quiz Service        (3002)   │
    │ Recommendation      (3003)   │
    │ Sentiment Service   (3004)   │
    │ University Service  (3005)   │
    │ Career Service      (3006)   │
    │ Admin Service       (3007)   │
    └──────────────────────────────┘
```

## Quick Start

### Option 1: Local Development

1. **Install Gateway Dependencies**
```powershell
cd backend/services/gateway
npm install
```

2. **Configure Environment**
```powershell
# Copy example env file
cp .env.example .env
# Edit .env with your settings
```

3. **Start All Services**

In separate terminals:

```powershell
# Terminal 1: Gateway
cd backend/services/gateway
npm run dev

# Terminal 2: Auth Service
cd backend/services/auth-service
npm run dev

# Terminal 3: University Service
cd backend/services/university-service
node src/index.js

# Terminal 4: Quiz Service
cd backend/services/quiz-service
npm run dev

# Terminal 5: Frontend
cd frontend
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:3001
- Gateway: http://localhost:3000
- Gateway Health: http://localhost:3000/health

### Option 2: Docker Compose

1. **Build and Start All Services**
```powershell
cd backend
docker-compose up --build
```

2. **Access the Application**
- Frontend: http://localhost:3001
- Gateway: http://localhost:3000
- Gateway Health: http://localhost:3000/health

## Gateway Features

### 1. Request Routing

All frontend requests go through the gateway:

```javascript
// Frontend makes request to gateway
fetch('http://localhost:3000/api/universities')
  ↓
// Gateway routes to university service
http://localhost:3005/api/universities
```

### 2. Authentication

Protected endpoints require JWT token:

```javascript
// Frontend includes token
fetch('http://localhost:3000/api/quiz/user/history', {
  headers: {
    'Authorization': 'Bearer <token>'
  }
})
  ↓
// Gateway validates token and forwards to quiz service
```

### 3. Inter-Service Communication

Services can call each other through the service client:

```javascript
// In any microservice
import { serviceClient } from './utils/serviceClient.js';

// Get data from another service
const universities = await serviceClient.get('university', '/api/universities');

// Post data to another service
const result = await serviceClient.post('sentiment', '/api/sentiment/analyze', {
  text: 'Great university!'
});
```

## Service Ports

| Service              | Port | URL                   |
|---------------------|------|-----------------------|
| Gateway             | 3000 | http://localhost:3000 |
| Auth Service        | 3001 | http://localhost:3001 |
| Quiz Service        | 3002 | http://localhost:3002 |
| Recommendation      | 3003 | http://localhost:3003 |
| Sentiment Service   | 3004 | http://localhost:3004 |
| University Service  | 3005 | http://localhost:3005 |
| Career Service      | 3006 | http://localhost:3006 |
| Admin Service       | 3007 | http://localhost:3007 |
| Frontend            | 3001 | http://localhost:3001 |

## API Endpoints

### Authentication (via Gateway)
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
POST   /api/auth/logout
```

### Universities (via Gateway)
```
GET    /api/universities
GET    /api/universities/:id
GET    /api/universities/search
POST   /api/universities/:id/favorite
GET    /api/universities/user/favorites
```

### Quiz (via Gateway)
```
GET    /api/quiz
POST   /api/quiz/:id/submit
GET    /api/quiz/user/history
GET    /api/quiz/user/results/:id
```

### Recommendations (via Gateway)
```
POST   /api/recommendations/generate
GET    /api/recommendations/user
GET    /api/recommendations/:id
```

### Sentiment (via Gateway)
```
GET    /api/sentiment/university/:id
GET    /api/sentiment/dashboard
POST   /api/sentiment/analyze
```

### Careers (via Gateway)
```
GET    /api/careers
GET    /api/careers/:id
POST   /api/careers/:id/save
GET    /api/careers/user/saved
```

### Admin (via Gateway)
```
GET    /api/admin/dashboard
GET    /api/admin/users
GET    /api/admin/analytics
```

## Testing the Gateway

### 1. Health Check
```powershell
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "gateway": "healthy",
  "timestamp": "2025-12-04T...",
  "services": {
    "auth": "http://localhost:3001",
    "quiz": "http://localhost:3002",
    ...
  }
}
```

### 2. Test Authentication
```powershell
# Register
curl -X POST http://localhost:3000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@example.com\",\"password\":\"password123\",\"name\":\"Test User\"}'

# Login
curl -X POST http://localhost:3000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@example.com\",\"password\":\"password123\"}'
```

### 3. Test Protected Endpoint
```powershell
# Get user profile (requires token)
curl http://localhost:3000/api/auth/me `
  -H "Authorization: Bearer <your-token>"
```

### 4. Test Public Endpoint
```powershell
# Get universities (no auth required)
curl http://localhost:3000/api/universities
```

## Troubleshooting

### Gateway Not Starting
1. Check if port 3000 is available
2. Verify all dependencies are installed
3. Check .env file exists and is configured

### Service Communication Errors
1. Verify all services are running
2. Check service URLs in .env match running ports
3. Check network connectivity between services

### Authentication Errors
1. Verify JWT_SECRET is the same across gateway and auth service
2. Check token format in Authorization header
3. Verify token hasn't expired

### CORS Errors
1. Check CORS_ORIGIN in gateway .env
2. Verify frontend URL matches CORS configuration
3. Check browser console for specific error

## Environment Variables

### Gateway (.env)
```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3001
JWT_SECRET=your-secret-key

AUTH_SERVICE_URL=http://localhost:3001
QUIZ_SERVICE_URL=http://localhost:3002
RECOMMENDATION_SERVICE_URL=http://localhost:3003
SENTIMENT_SERVICE_URL=http://localhost:3004
UNIVERSITY_SERVICE_URL=http://localhost:3005
CAREER_SERVICE_URL=http://localhost:3006
ADMIN_SERVICE_URL=http://localhost:3007
```

### Docker Environment
When using Docker, service URLs should use container names:
```env
AUTH_SERVICE_URL=http://auth-service:3001
QUIZ_SERVICE_URL=http://quiz-service:3002
...
```

## Monitoring

View gateway logs:
```powershell
# Local development
npm run dev

# Docker
docker-compose logs -f gateway
```

## Security Notes

1. **Change JWT_SECRET in production**
2. **Use HTTPS in production**
3. **Configure CORS_ORIGIN for your domain**
4. **Enable rate limiting for production**
5. **Use environment-specific .env files**

## Next Steps

1. ✅ Gateway is set up and routing requests
2. ✅ All services can communicate through gateway
3. ⏳ Implement service-specific business logic
4. ⏳ Add comprehensive error handling in each service
5. ⏳ Set up monitoring and logging
6. ⏳ Add integration tests
7. ⏳ Deploy to production environment

## Support

For issues or questions:
1. Check service logs
2. Verify .env configuration
3. Test services individually
4. Test through gateway
5. Check network connectivity
