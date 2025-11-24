# 🌐 ILM-ORA Hybrid Microservices + Layered Architecture

## 🎯 Architecture Overview

ILM-ORA now follows a **Hybrid Architecture** combining:
1. **Microservices** (Horizontal Split) - Independent functional services
2. **Layered Architecture** (Vertical Split) - 4-layer pattern within each service

```
┌──────────────────────────────────────────────────────────────────┐
│                          APP SHELL                                │
│                  (Routing, Providers, Global State)              │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                        MICROSERVICES                              │
│                                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │   Quiz   │ │   Rec    │ │Sentiment │ │   Auth   │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │University│ │  Career  │ │Scholarsh.│ │ Hostels  │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                                                                   │
│  ┌──────────┐                                                    │
│  │  Admin   │                                                    │
│  └──────────┘                                                    │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                         SHARED LAYER                              │
│         (Common Components, Utils, Types, Constants)             │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
src/
├── app/                              # 🏠 App Shell
│   ├── App.tsx
│   ├── main.tsx
│   ├── routes/
│   │   ├── index.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── publicRoutes.tsx
│   │   └── protectedRoutes.tsx
│   └── providers/
│       ├── AppProviders.tsx
│       ├── ThemeProvider.tsx
│       ├── AuthProvider.tsx
│       └── QueryProvider.tsx
│
├── microservices/                    # 🌐 Microservices
│   │
│   ├── quiz/                         # 🧠 Quiz Service (RIASEC)
│   │   ├── presentation/
│   │   │   ├── pages/
│   │   │   │   ├── QuizIntro.tsx
│   │   │   │   ├── QuizQuestions.tsx
│   │   │   │   └── QuizResults.tsx
│   │   │   └── components/
│   │   │       ├── QuizCard.tsx
│   │   │       └── OptionScale.tsx
│   │   ├── application/
│   │   │   ├── quizService.ts
│   │   │   ├── quizStore.ts         # Zustand store
│   │   │   └── quizMapper.ts
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── Question.ts
│   │   │   │   └── QuizResult.ts
│   │   │   └── services/
│   │   │       └── QuizLogic.ts
│   │   └── infrastructure/
│   │       ├── api/quizAPI.ts
│   │       └── persistence/quizCache.ts
│   │
│   ├── recommendation/               # 🎓 Recommendation Service
│   │   ├── presentation/pages/
│   │   ├── application/recommendationService.ts
│   │   ├── domain/
│   │   │   ├── entities/Recommendation.ts
│   │   │   └── services/RecommendationEngine.ts
│   │   └── infrastructure/
│   │
│   ├── sentiment/                    # 💬 Sentiment Service
│   │   ├── presentation/pages/SentimentDashboard.tsx
│   │   ├── application/sentimentService.ts
│   │   ├── domain/
│   │   │   ├── entities/SurveyResponse.ts
│   │   │   └── services/SentimentAnalyzer.ts
│   │   └── infrastructure/
│   │
│   ├── auth/                         # 🔐 Authentication Service
│   │   ├── presentation/pages/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── application/authService.ts
│   │   ├── domain/
│   │   │   ├── entities/User.ts
│   │   │   └── services/AuthCore.ts
│   │   └── infrastructure/api/authAPI.ts
│   │
│   ├── university/                   # 🏫 University Service
│   │   ├── presentation/pages/
│   │   │   ├── UniversityList.tsx
│   │   │   └── UniversityDetail.tsx
│   │   ├── application/universityService.ts
│   │   ├── domain/
│   │   │   ├── entities/University.ts
│   │   │   └── entities/Program.ts
│   │   └── infrastructure/
│   │
│   ├── career/                       # 💼 Career Service
│   │   ├── presentation/pages/CareerInsights.tsx
│   │   ├── application/careerService.ts
│   │   ├── domain/entities/Career.ts
│   │   └── infrastructure/api/careerAPI.ts
│   │
│   ├── scholarships/                 # 🎓 Scholarships Service
│   │   ├── presentation/pages/ScholarshipFinder.tsx
│   │   ├── application/scholarshipService.ts
│   │   ├── domain/
│   │   │   ├── entities/Scholarship.ts
│   │   │   └── services/ScholarshipMatcher.ts
│   │   └── infrastructure/
│   │       ├── api/scholarshipAPI.ts
│   │       └── data/mockScholarships.ts
│   │
│   ├── hostels/                      # 🏠 Hostels Service
│   │   ├── presentation/pages/HostelFinder.tsx
│   │   ├── application/hostelService.ts
│   │   ├── domain/
│   │   │   ├── entities/Hostel.ts
│   │   │   └── services/HostelMatcher.ts
│   │   └── infrastructure/
│   │       ├── api/hostelAPI.ts
│   │       └── data/mockHostels.ts
│   │
│   └── admin/                        # ⚙️ Admin Service
│       ├── presentation/pages/AdminDashboard.tsx
│       ├── application/adminService.ts
│       ├── domain/services/DataPreprocessor.ts
│       └── infrastructure/api/adminAPI.ts
│
├── shared/                           # ♻️ Shared Layer
│   ├── components/
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ChartWidget.tsx
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   ├── utils/
│   │   ├── axiosClient.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── constants/
│   │   ├── colors.ts
│   │   └── routes.ts
│   └── types/
│       └── common.ts
│
└── config/
    ├── env.ts
    ├── apiEndpoints.ts
    └── tailwind.config.ts
```

---

## 🔍 Microservice Details

### 1. **Quiz Service** 🧠

**Purpose**: Handle RIASEC personality quiz

**Features**:
- 30 questions across 6 RIASEC categories
- Real-time score calculation
- Progress saving
- Results visualization

**Key Files**:
- `QuizLogic.ts` - Score calculation algorithm
- `quizService.ts` - Business orchestration
- `quizStore.ts` - State management (Zustand)
- `quizCache.ts` - LocalStorage persistence

**API Endpoints**:
```typescript
GET    /api/quiz/questions
POST   /api/quiz/submit
GET    /api/quiz/results/:userId
```

---

### 2. **Recommendation Service** 🎓

**Purpose**: Generate AI-powered degree/university suggestions

**Features**:
- RIASEC-based matching
- Multi-factor scoring
- University filtering
- Career alignment

**Key Files**:
- `RecommendationEngine.ts` - Core matching algorithm
- `recommendationService.ts` - Orchestration

**API Endpoints**:
```typescript
POST   /api/recommendations/generate
GET    /api/recommendations/:userId
```

---

### 3. **Sentiment Service** 💬

**Purpose**: Analyze student reviews and sentiments

**Features**:
- Text sentiment analysis
- University ratings
- Trend visualization
- Topic extraction

**Key Files**:
- `SentimentAnalyzer.ts` - NLP logic
- `sentimentService.ts` - Analysis orchestration

**API Endpoints**:
```typescript
GET    /api/sentiment/university/:id
POST   /api/sentiment/analyze
```

---

### 4. **Auth Service** 🔐

**Purpose**: User authentication and authorization

**Features**:
- JWT-based auth
- Session management
- Role-based access (Student/Admin)
- Password reset

**Key Files**:
- `AuthCore.ts` - Authentication logic
- `authService.ts` - Auth operations

**API Endpoints**:
```typescript
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
POST   /api/auth/refresh
```

---

### 5. **University Service** 🏫

**Purpose**: University and program data management

**Features**:
- University search
- Program listings
- Detailed information
- Comparison tools

**Key Files**:
- `University.ts` - Entity definition
- `universityService.ts` - CRUD operations

**API Endpoints**:
```typescript
GET    /api/universities
GET    /api/universities/:id
GET    /api/universities/:id/programs
POST   /api/universities/search
```

---

### 6. **Career Service** 💼

**Purpose**: Career insights and salary data

**Features**:
- Career profiles
- Salary trends (PKR)
- Job growth statistics
- Skill requirements

**Key Files**:
- `Career.ts` - Entity definition
- `careerService.ts` - Career data management

**API Endpoints**:
```typescript
GET    /api/careers
GET    /api/careers/:id
GET    /api/careers/trends
```

---

### 7. **Scholarships Service** 🎓

**Purpose**: Scholarship discovery and matching

**Features**:
- Scholarship search
- Eligibility matching
- Deadline tracking
- Application guidance

**Key Files**:
- `ScholarshipMatcher.ts` - Matching algorithm
- `scholarshipService.ts` - Search & filter
- `mockScholarships.ts` - 6 Pakistani scholarships

**API Endpoints**:
```typescript
GET    /api/scholarships
GET    /api/scholarships/:id
POST   /api/scholarships/search
POST   /api/scholarships/apply
```

**Mock Data Includes**:
- HEC Need-Based Scholarship
- NUST Merit Scholarship
- LUMS National Outreach
- Fulbright Scholarship
- Ehsaas Undergraduate
- AKU Medical Scholarship

---

### 8. **Hostels Service** 🏠

**Purpose**: Student accommodation finder

**Features**:
- Hostel search by university
- Distance calculation
- Facility filtering
- Availability checking
- Price comparison

**Key Files**:
- `HostelMatcher.ts` - Matching & filtering
- `hostelService.ts` - Search operations
- `mockHostels.ts` - 5 hostels data

**API Endpoints**:
```typescript
GET    /api/hostels
GET    /api/hostels/:id
GET    /api/hostels/university/:universityId
POST   /api/hostels/search
POST   /api/hostels/book
```

**Mock Data Includes**:
- NUST Boys Hostel
- NUST Girls Hostel
- FAST Private PG
- LUMS On-Campus Residence
- AKU Student Accommodation

---

### 9. **Admin Service** ⚙️

**Purpose**: Data management and analytics

**Features**:
- User management
- Content moderation
- Analytics dashboard
- Data export

**Key Files**:
- `DataPreprocessor.ts` - Data cleaning
- `adminService.ts` - Admin operations

**API Endpoints**:
```typescript
GET    /api/admin/stats
GET    /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/content/:id
```

---

## 🎯 Layered Architecture (Inside Each Microservice)

Each microservice follows a 4-layer pattern:

### 1. **Presentation Layer**
- **Responsibility**: UI components and pages
- **Dependencies**: Application layer only
- **Examples**: QuizIntro.tsx, ScholarshipFinder.tsx

### 2. **Application Layer**
- **Responsibility**: Business orchestration, state management
- **Dependencies**: Domain layer, Infrastructure layer
- **Examples**: quizService.ts, scholarshipService.ts

### 3. **Domain Layer**
- **Responsibility**: Core business logic, pure functions
- **Dependencies**: NONE (zero external dependencies)
- **Examples**: QuizLogic.ts, ScholarshipMatcher.ts

### 4. **Infrastructure Layer**
- **Responsibility**: External APIs, databases, persistence
- **Dependencies**: Domain interfaces
- **Examples**: quizAPI.ts, quizCache.ts

---

## 🔄 Data Flow Example: Taking the Quiz

```
1. User clicks "Start Quiz"
   ↓
2. QuizIntro.tsx (Presentation)
   ↓
3. quizService.getQuestions() (Application)
   ↓
4. quizAPI.getQuestions() (Infrastructure)
   ↓ (if API fails)
5. quizCache.getQuestions() (Infrastructure)
   ↓ (if cache empty)
6. Mock data from quizService
   ↓
7. Questions displayed to user
   ↓
8. User submits answers
   ↓
9. QuizLogic.calculateScores() (Domain)
   ↓
10. Scores saved to quizStore (Application)
   ↓
11. Navigate to QuizResults.tsx (Presentation)
```

---

## 🚀 Benefits of This Architecture

### 1. **Independence**
- Each microservice can be developed independently
- Teams can work in parallel
- Deploy services separately

### 2. **Scalability**
- Scale individual services based on demand
- Quiz service can handle more load than Admin service
- Horizontal scaling per service

### 3. **Maintainability**
- Clear boundaries between services
- Easy to locate code
- Simple to understand

### 4. **Testability**
- Domain logic is pure (no side effects)
- Easy to mock dependencies
- Test each layer independently

### 5. **Flexibility**
- Swap implementations easily
- Change UI without affecting business logic
- Replace API clients without changing domain

---

## 📦 Shared Layer

The shared layer contains:

### Components
- `LoadingSpinner.tsx` - Reusable loading indicator
- `ErrorMessage.tsx` - Error display component
- `Navbar.tsx` - Global navigation (not implemented yet)
- `Footer.tsx` - Global footer (not implemented yet)

### Utils
- `axiosClient.ts` - Configured HTTP client
- `formatters.ts` - Date, currency formatters (not implemented yet)
- `validators.ts` - Form validation (not implemented yet)

### Constants
- `colors.ts` - Theme colors (Primary: #1976D2, Secondary: #FB8C00)
- `routes.ts` - Route definitions (not implemented yet)

### Types
- `common.ts` - Shared TypeScript types

### Hooks
- `useDebounce.ts` - Debounce hook for search
- `useLocalStorage.ts` - LocalStorage hook (not implemented yet)

---

## 🎨 Import Paths

Use these import patterns:

```typescript
// From same microservice
import { QuizLogic } from "../domain/services/QuizLogic";
import { quizAPI } from "../infrastructure/api/quizAPI";

// From shared layer
import { axiosClient } from "@/shared/utils/axiosClient";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { COLORS } from "@/shared/constants/colors";

// From app shell
import { useAuth } from "@/app/providers/AuthProvider";
import { useTheme } from "@/app/providers/ThemeProvider";

// From other microservice (use services only, not direct imports)
import { recommendationService } from "@/microservices/recommendation/application/recommendationService";
```

---

## 📊 Implementation Status

| Microservice | Domain | Application | Infrastructure | Presentation | Status |
|--------------|--------|-------------|----------------|--------------|--------|
| **Quiz** | ✅ 100% | ✅ 100% | ✅ 100% | 🔜 0% | 75% |
| **Recommendation** | ✅ 100% | ✅ 50% | 🔜 0% | 🔜 0% | 40% |
| **Sentiment** | ✅ 100% | 🔜 0% | 🔜 0% | 🔜 0% | 25% |
| **Auth** | 🔜 0% | 🔜 0% | 🔜 0% | 🔜 0% | 0% |
| **University** | ✅ 100% | 🔜 0% | ✅ 50% | 🔜 0% | 40% |
| **Career** | ✅ 100% | 🔜 0% | ✅ 50% | 🔜 0% | 40% |
| **Scholarships** | ✅ 100% | ✅ 100% | ✅ 100% | 🔜 0% | 75% |
| **Hostels** | ✅ 100% | ✅ 100% | ✅ 100% | 🔜 0% | 75% |
| **Admin** | 🔜 0% | 🔜 0% | 🔜 0% | 🔜 0% | 0% |

**Overall Progress**: **45%** Complete

---

## 🔮 Future: Monorepo Setup (Optional)

For true microservices, you can restructure as:

```
ilm-ora/
├── apps/
│   └── frontend/              # Main React app
├── services/
│   ├── quiz/                  # Independent quiz service
│   ├── recommendation/        # Independent recommendation service
│   ├── sentiment/             # Independent sentiment service
│   └── ...                    # Other services
└── shared/
    ├── ui-components/         # Shared UI package
    ├── types/                 # Shared TypeScript types
    └── utils/                 # Shared utilities
```

**Tools**:
- **Turborepo** - Build system
- **pnpm workspaces** - Package management
- **Changesets** - Version management

---

## 📝 Next Steps

1. **Complete Presentation Layer** - Migrate all pages to microservices
2. **Create Missing Services** - Auth, Admin infrastructure
3. **Add State Management** - Zustand stores for each service
4. **API Integration** - Connect to real backend
5. **Testing** - Unit & integration tests per microservice

---

**Built with ❤️ for ILM-ORA**  
**Architecture**: Hybrid Microservices + Layered  
**Status**: 45% Complete  
**Next Milestone**: Complete all microservices (75%)

---

This architecture provides a solid foundation for a scalable, maintainable, and professional application! 🚀
