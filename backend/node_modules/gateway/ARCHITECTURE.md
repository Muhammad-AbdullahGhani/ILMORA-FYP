# 🏗️ ILM-ORA Microservices Architecture with API Gateway

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                             │
│                    http://localhost:3001                             │
│                                                                       │
│  • Universities Page                                                 │
│  • Quiz Page                                                         │
│  • Recommendations                                                   │
│  • User Dashboard                                                    │
└────────────────────────┬────────────────────────────────────────────┘
                         │
                         │ HTTP Requests (/api/*)
                         │ Vite Proxy
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       API GATEWAY                                    │
│                   http://localhost:3000                              │
│                                                                       │
│  ┌───────────────────────────────────────────────────────────┐      │
│  │ Middleware Stack                                           │      │
│  │ • CORS (Cross-Origin)                                     │      │
│  │ • Helmet (Security Headers)                               │      │
│  │ • Rate Limiting (100 req/15min)                           │      │
│  │ • Authentication (JWT Verification)                       │      │
│  │ • Request Logging                                          │      │
│  │ • Error Handling                                           │      │
│  └───────────────────────────────────────────────────────────┘      │
│                                                                       │
│  ┌───────────────────────────────────────────────────────────┐      │
│  │ Service Registry                                           │      │
│  │ • Auth Service         → localhost:3001                   │      │
│  │ • Quiz Service         → localhost:3002                   │      │
│  │ • Recommendation Service → localhost:3003                 │      │
│  │ • Sentiment Service    → localhost:3004                   │      │
│  │ • University Service   → localhost:3005                   │      │
│  │ • Career Service       → localhost:3006                   │      │
│  │ • Admin Service        → localhost:3007                   │      │
│  └───────────────────────────────────────────────────────────┘      │
│                                                                       │
│  ┌───────────────────────────────────────────────────────────┐      │
│  │ Routes                                                     │      │
│  │ /api/auth/*          → Auth Service                       │      │
│  │ /api/quiz/*          → Quiz Service                       │      │
│  │ /api/recommendations/* → Recommendation Service           │      │
│  │ /api/sentiment/*     → Sentiment Service                  │      │
│  │ /api/universities/*  → University Service                 │      │
│  │ /api/careers/*       → Career Service                     │      │
│  │ /api/admin/*         → Admin Service                      │      │
│  └───────────────────────────────────────────────────────────┘      │
└────────────────┬────────────┬────────────┬──────────────┬───────────┘
                 │            │            │              │
      ┌──────────┴─┐  ┌──────┴────┐  ┌───┴──────┐  ┌───┴──────┐
      │            │  │           │  │          │  │          │
      ▼            ▼  ▼           ▼  ▼          ▼  ▼          ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│   Auth   │ │   Quiz   │ │  Recom   │ │Sentiment │ │University│
│ Service  │ │ Service  │ │ Service  │ │ Service  │ │ Service  │
│  :3001   │ │  :3002   │ │  :3003   │ │  :3004   │ │  :3005   │
├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤
│          │ │          │ │          │ │          │ │          │
│ • Login  │ │ • Create │ │ • AI Gen │ │ • Analyze│ │ • List   │
│ • Signup │ │ • Submit │ │ • Match  │ │ • Reviews│ │ • Search │
│ • Profile│ │ • Results│ │ • Compare│ │ • Ratings│ │ • Details│
│ • Verify │ │ • History│ │ • Save   │ │ • Trends │ │ • Programs│
│          │ │          │ │          │ │          │ │          │
│ MongoDB  │ │ MongoDB  │ │ MongoDB  │ │ MongoDB  │ │ MongoDB  │
│  auth-db │ │  quiz-db │ │  rec-db  │ │ sent-db  │ │  uni-db  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
      │            │            │              │            │
      └────────────┴────────────┴──────────────┴────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
              ┌──────────┐          ┌──────────┐
              │  Career  │          │  Admin   │
              │ Service  │          │ Service  │
              │  :3006   │          │  :3007   │
              ├──────────┤          ├──────────┤
              │          │          │          │
              │ • List   │          │ • Dashboard
              │ • Search │          │ • Users  │
              │ • Details│          │ • Analytics
              │ • Save   │          │ • Logs   │
              │          │          │          │
              │ MongoDB  │          │ MongoDB  │
              │career-db │          │ admin-db │
              └──────────┘          └──────────┘
```

## Request Flow Example

### 1. Get Universities
```
Client Request: GET /api/universities
    ↓
Frontend: fetch('/api/universities')
    ↓
Vite Proxy: → http://localhost:3000/api/universities
    ↓
Gateway Middleware:
    • CORS check ✓
    • Rate limit check ✓
    • Optional auth ✓
    • Route match: /api/universities → university service
    ↓
Service Client: GET http://localhost:3005/api/universities
    ↓
University Service: Query MongoDB → Return data
    ↓
Gateway: Forward response
    ↓
Frontend: Receive universities data
```

### 2. Submit Quiz (Authenticated)
```
Client Request: POST /api/quiz/123/submit + Bearer token
    ↓
Frontend: fetch with Authorization header
    ↓
Gateway Middleware:
    • CORS check ✓
    • Rate limit check ✓
    • Auth required ✓ (verify JWT)
    • Extract user context
    • Route match: /api/quiz/:id/submit → quiz service
    ↓
Service Client: POST http://localhost:3002/api/quiz/123/submit
    • Include X-User-Id header
    • Include X-User-Email header
    ↓
Quiz Service:
    • Receive quiz answers
    • Process and score
    • Save to database
    • Trigger recommendation generation (optional inter-service call)
    ↓
Gateway: Forward response
    ↓
Frontend: Display results
```

### 3. Inter-Service Communication
```
Recommendation Service needs university data:
    ↓
Import { serviceClient } from gateway utils
    ↓
serviceClient.get('university', '/api/universities/123')
    ↓
HTTP Request: http://localhost:3005/api/universities/123
    ↓
University Service: Return data
    ↓
Recommendation Service: Use data to generate recommendations
```

## Key Features

### 🔒 Security
- JWT authentication
- Role-based access control
- Rate limiting
- Helmet security headers
- CORS configuration

### 🚦 Routing
- Centralized routing
- Dynamic path parameters
- Query string forwarding
- Header propagation

### 🔄 Service Communication
- HTTP client for inter-service calls
- Service registry for discovery
- Automatic retry logic
- Health check monitoring

### 📊 Observability
- Request/response logging
- Duration tracking
- Error tracking
- Service health monitoring

### ⚡ Performance
- Connection pooling
- Request timeout (30s)
- Rate limiting
- Efficient routing

## Layered Architecture (Each Service)

```
Service/
├── Presentation Layer (Controllers/Routes)
│   └── Handle HTTP requests/responses
├── Application Layer (Services)
│   └── Business logic & orchestration
├── Domain Layer (Entities/Models)
│   └── Core business entities
└── Infrastructure Layer (Database/APIs)
    └── Data persistence & external APIs
```

## Data Flow

```
Request → Gateway → Service → Database
                     ↓
                  Other Services (via serviceClient)
                     ↓
Response ← Gateway ← Service ← Database
```

## Deployment Architecture

### Development (Current)
- All services on localhost
- Different ports per service
- Gateway on port 3000
- Frontend on port 3001

### Production (Docker)
```
Docker Network: ilm-ora-network
├── gateway:3000 (exposed to host)
├── auth-service:3001 (internal)
├── quiz-service:3002 (internal)
├── university-service:3005 (internal)
├── ... other services
└── MongoDB containers (internal)
```

## Benefits of This Architecture

✅ **Scalability**: Services can scale independently
✅ **Maintainability**: Clear separation of concerns
✅ **Flexibility**: Easy to add/remove services
✅ **Security**: Centralized authentication
✅ **Monitoring**: Single point for logging
✅ **Performance**: Rate limiting & caching at gateway
✅ **Developer Experience**: Single API endpoint for frontend

---

**Status**: ✅ Fully Implemented
**Gateway**: 🟢 Running
**Services**: Ready to connect
