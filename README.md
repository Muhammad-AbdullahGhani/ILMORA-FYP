# FYP-ILM-ORA

Top-level README for the project workspace.



ilm-ora/
├── frontend/                              # 🎨 Frontend Monorepo
│   ├── src/
│   │   ├── app/                           # Global App setup
│   │   ├── microservices/                 # Each microservice has 4 layers
│   │   │   ├── quiz/
│   │   │   ├── recommendation/
│   │   │   ├── sentiment/
│   │   │   ├── auth/
│   │   │   ├── university/
│   │   │   ├── career/
│   │   │   ├── scholarships/
│   │   │   ├── hostels/
│   │   │   └── admin/
│   │   ├── shared/
│   │   └── config/
│   ├── public/
│   └── package.json
│
├── backend/                               # ⚙️ Backend Monorepo
│   ├── services/                          # Each service = independent backend microservice
│   │   ├── auth-service/
│   │   │   ├── src/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── authController.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── authRoutes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── authService.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── User.js
│   │   │   │   ├── utils/
│   │   │   │   │   ├── tokenManager.js
│   │   │   │   └── index.js
│   │   │   ├── tesjs/
│   │   │   ├── Dockerfile
│   │   │   ├── package.json
│   │   │   └── jsconfig.json
│   │   │
│   │   ├── quiz-service/
│   │   │   ├── src/
│   │   │   │   ├── controllers/quizController.js
│   │   │   │   ├── routes/quizRoutes.js
│   │   │   │   ├── services/quizLogic.js
│   │   │   │   ├── models/Question.js
│   │   │   │   ├── models/QuizResult.js
│   │   │   │   └── index.js
│   │   │   ├── Dockerfile
│   │   │   └── package.json
│   │   │
│   │   ├── recommendation-service/
│   │   │   ├── src/
│   │   │   │   ├── controllers/recommendationController.js
│   │   │   │   ├── services/recommendationEngine.js
│   │   │   │   ├── routes/recommendationRoutes.js
│   │   │   │   ├── models/Recommendation.js
│   │   │   │   └── index.js
│   │   │   ├── Dockerfile
│   │   │   └── package.json
│   │   │
│   │   ├── sentiment-service/
│   │   │   ├── src/
│   │   │   │   ├── controllers/sentimentController.js
│   │   │   │   ├── services/sentimentAnalyzer.js
│   │   │   │   ├── routes/sentimentRoutes.js
│   │   │   │   └── models/SurveyResponse.js
│   │   │   └── Dockerfile
│   │   │
│   │   ├── university-service/
│   │   │   ├── src/
│   │   │   │   ├── controllers/universityController.js
│   │   │   │   ├── models/University.js
│   │   │   │   ├── routes/universityRoutes.js
│   │   │   │   └── services/universityService.js
│   │   │   └── Dockerfile
│   │   │
│   │   ├── career-service/
│   │   │   ├── src/
│   │   │   │   ├── controllers/careerController.js
│   │   │   │   ├── services/careerService.js
│   │   │   │   └── models/Career.js
│   │   │   └── Dockerfile
│   │   │
│   │   ├── admin-service/
│   │   │   ├── src/
│   │   │   │   ├── controllers/adminController.js
│   │   │   │   ├── services/dataPreprocessor.js
│   │   │   │   └── routes/adminRoutes.js
│   │   │   └── Dockerfile
│   │   │
│   │   └── gateway/                    # 🌉 API Gateway / BFF
│   │       ├── src/
│   │       │   ├── index.js
│   │       │   ├── middleware/
│   │       │   │   └── authMiddleware.js
│   │       │   ├── routes/
│   │       │   │   ├── proxyRoutes.js
│   │       │   └── utils/
│   │       │       └── rateLimiter.js
│   │       ├── Dockerfile
│   │       └── package.json
│   │
│   ├── shared/
│   │   ├── db/
│   │   │   ├── connectMongo.js
│   │   │   └── connectPostgres.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   └── errorHandler.js
│   │   └── constanjs/
│   │       └── env.js
│   │
│   ├── docker-compose.yml               # Spins up all services + DBs
│   ├── package.json
│   └── jsconfig.json
│
├── docs/
│   ├── diagrams/
│   │   ├── class-diagram.mmd
│   │   ├── architecture.mmd
│   │   └── deployment.mmd
│   ├── API_DOCS.md
│   └── README.md
│
└── README.md
