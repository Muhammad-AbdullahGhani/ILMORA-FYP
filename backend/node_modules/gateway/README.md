# API Gateway Service

API Gateway for ILM-ORA microservices architecture. Routes requests to appropriate microservices and handles cross-cutting concerns.

## Features

- **Request Routing**: Routes API requests to appropriate microservices
- **Authentication**: JWT-based authentication and authorization
- **Rate Limiting**: Prevents API abuse
- **CORS**: Configurable cross-origin resource sharing
- **Request Logging**: Comprehensive request/response logging
- **Error Handling**: Centralized error handling and formatting
- **Service Discovery**: Dynamic service registry
- **Inter-service Communication**: Built-in HTTP client for service-to-service calls

## Architecture

```
Client → API Gateway → Microservices
                     ├── Auth Service (3001)
                     ├── Quiz Service (3002)
                     ├── Recommendation Service (3003)
                     ├── Sentiment Service (3004)
                     ├── University Service (3005)
                     ├── Career Service (3006)
                     └── Admin Service (3007)
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Quiz
- `GET /api/quiz` - Get all quizzes
- `POST /api/quiz/:id/submit` - Submit quiz (protected)
- `GET /api/quiz/user/history` - Get user quiz history (protected)

### Recommendations
- `POST /api/recommendations/generate` - Generate recommendations (protected)
- `GET /api/recommendations/user` - Get user recommendations (protected)

### Universities
- `GET /api/universities` - Get all universities
- `GET /api/universities/:id` - Get university details
- `POST /api/universities/:id/favorite` - Add to favorites (protected)

### Sentiment
- `GET /api/sentiment/university/:id` - Get university sentiment
- `GET /api/sentiment/dashboard` - Get sentiment dashboard

### Careers
- `GET /api/careers` - Get all careers
- `GET /api/careers/:id` - Get career details
- `POST /api/careers/:id/save` - Save career (protected)

### Admin
- `GET /api/admin/dashboard` - Admin dashboard (admin only)
- `GET /api/admin/users` - List users (admin only)
- `GET /api/admin/analytics` - System analytics (admin only)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the gateway:
```bash
# Development
npm run dev

# Production
npm start
```

## Environment Variables

See `.env.example` for all available configuration options.

## Middleware

### Authentication Middleware
- `authMiddleware`: Requires valid JWT token
- `optionalAuth`: Optional JWT authentication
- `adminMiddleware`: Requires admin role
- `requireRole(...roles)`: Custom role-based access control

### Security Middleware
- Rate limiting (100 requests per 15 minutes)
- Helmet security headers
- CORS configuration

## Service Communication

Services can communicate with each other using the `serviceClient` utility:

```javascript
import { serviceClient } from './utils/serviceClient.js';

// GET request
const universities = await serviceClient.get('university', '/api/universities');

// POST request
const result = await serviceClient.post('quiz', '/api/quiz/submit', {
  answers: [...]
});

// With authentication
const data = await serviceClient.forwardWithAuth('recommendation', {
  method: 'POST',
  path: '/api/recommendations/generate',
  data: { preferences }
}, req.user);
```

## Error Handling

All errors are caught and formatted consistently:

```json
{
  "error": "Error message",
  "service": "service-name",
  "details": {} // Only in development
}
```

## Health Check

```bash
GET /health
```

Returns gateway status and registered services.

## Development

The gateway uses a layered architecture:

```
src/
├── index.js              # Application entry point
├── routes/               # Route definitions
│   ├── index.js         # Main router
│   ├── authRoutes.js    # Auth endpoints
│   ├── quizRoutes.js    # Quiz endpoints
│   └── ...
├── middleware/           # Express middleware
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── proxyHandler.js
│   └── rateLimiter.js
└── utils/               # Utilities
    ├── serviceRegistry.js  # Service discovery
    └── serviceClient.js    # HTTP client
```

## Docker

Build and run with Docker:

```bash
docker build -t gateway .
docker run -p 3000:3000 gateway
```

## Testing

```bash
npm test
```

## License

ISC
