# ILM-ORA - Intelligent Recommendation Application

An AI-powered educational guidance platform that helps students find their ideal university and career path through intelligent recommendations.

## 🚀 Features

- **Adaptive Career Quiz** - Holland Code (RIASEC) based personality assessment
- **AI-Powered Degree Recommendations** - Smart degree suggestions based on quiz results
- **University Search & Comparison** - Explore 500+ Pakistani universities
- **Career Insights** - Detailed career information with salary data
- **Sentiment Analysis** - University review analysis
- **Scholarship Finder** - Find scholarships matching your profile
- **Hostel Finder** - Discover student accommodations
- **Contact Form** - Get in touch with email notifications

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download](https://www.python.org/)
- **MongoDB** (v6.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

### ⚠️ Important: MongoDB Setup

**MongoDB must be running locally before starting the backend services.**

1. Install MongoDB Community Edition
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically, or run `mongod` in terminal
   - **Mac/Linux**: Run `sudo systemctl start mongod` or `brew services start mongodb-community`
3. Verify MongoDB is running on `mongodb://localhost:27017`

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Taimoor-Raza-Asif/ILM-ORA.git
cd ILM-ORA
```

### 2. Backend Setup

#### Install Dependencies for All Services

Navigate to each service directory and install Node.js dependencies:

```bash
# Gateway Service
cd backend/services/gateway
npm install

# Auth Service
cd ../auth-service
npm install

# University Service
cd ../university-service
npm install

# Career Service
cd ../career-service
npm install

# Admin Service
cd ../admin-service
npm install

# Quiz Service (Python - FastAPI)
cd ../quiz-service
pip install -r requirements.txt

# Recommendation Service (Python - FastAPI)
cd ../recommendation-service
pip install -r requirements.txt

# Sentiment Service (Python - FastAPI)
cd ../sentiment-service
pip install -r requirements.txt

# Go back to backend root
cd ../../..
```

#### Configure Environment Variables

Each Node.js service has a `.env` file in `backend/services/[service-name]/`. Ensure the following are configured:

**Gateway Service** (`backend/services/gateway/.env`):
```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3001

# Email Configuration (for contact form)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Service URLs
AUTH_SERVICE_URL=http://localhost:3008
QUIZ_SERVICE_URL=http://localhost:3002
RECOMMENDATION_SERVICE_URL=http://localhost:3003
SENTIMENT_SERVICE_URL=http://localhost:3004
UNIVERSITY_SERVICE_URL=http://localhost:3005
CAREER_SERVICE_URL=http://localhost:3006
ADMIN_SERVICE_URL=http://localhost:3007
```

**Other Services**: Check individual `.env` files for MongoDB connection strings and port configurations.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## 🚀 Running the Project

### Start Backend Services

**Important**: Ensure MongoDB is running before starting backend services!

From the `backend` folder, run the PowerShell script to start all services:

```bash
cd backend
.\start-services.ps1
```

This will start:
- Gateway (Port 3000)
- Quiz Service (Port 3002)
- Recommendation Service (Port 3003)
- Sentiment Service (Port 3004)
- University Service (Port 3005)
- Career Service (Port 3006)
- Admin Service (Port 3007)
- Auth Service (Port 3008)

**Verify Services are Running:**
- Check terminal output for successful startup messages
- Each service should show "listening on port XXXX"

### Start Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will start on **http://localhost:3001**

## 📁 Project Structure

```
ILM-ORA/
├── backend/
│   ├── services/
│   │   ├── gateway/           # API Gateway (Port 3000)
│   │   ├── auth-service/      # Authentication (Port 3008)
│   │   ├── quiz-service/      # Career Quiz (Port 3002) [Python]
│   │   ├── recommendation-service/  # AI Recommendations (Port 3003) [Python]
│   │   ├── sentiment-service/ # Review Analysis (Port 3004) [Python]
│   │   ├── university-service/# University Data (Port 3005)
│   │   ├── career-service/    # Career Info (Port 3006)
│   │   └── admin-service/     # Admin Panel (Port 3007)
│   ├── shared/                # Shared data (universities, careers, etc.)
│   └── start-services.ps1     # PowerShell script to start all services
│
└── frontend/                  # React + Vite (Port 3001)
    ├── src/
    │   ├── app/              # App configuration & routes
    │   ├── microservices/    # Feature modules
    │   ├── presentation/     # UI components & pages
    │   └── shared/           # Shared utilities & components
    └── package.json
```

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solution**:
1. Verify MongoDB is running: `mongosh` (should connect successfully)
2. Check MongoDB service status
3. Ensure connection string in `.env` files is correct: `mongodb://localhost:27017`

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
1. Stop the service using that port
2. Or change the port in the service's `.env` file

### Python Services Not Starting

**Error**: `ModuleNotFoundError: No module named 'fastapi'`

**Solution**:
```bash
cd backend/services/[service-name]
pip install -r requirements.txt
```

### Frontend Not Connecting to Backend

**Solution**:
1. Verify all backend services are running
2. Check `frontend/vite.config.ts` proxy configuration
3. Ensure CORS is properly configured in gateway

## 📧 Email Configuration (Contact Form)

To enable the contact form email functionality:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Generate an App Password:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password
4. Update `backend/services/gateway/.env`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   ```

## 🎯 Usage Flow

1. **Home Page** → Browse features
2. **Take Quiz** → Complete career assessment quiz
3. **View Results** → See your Holland code and personality type
4. **Get Recommendations** → View AI-powered degree suggestions
5. **Explore Universities** → Search and compare universities
6. **Career Insights** → Research career paths with salary info
7. **Find Scholarships** → Discover scholarship opportunities

## 🛡️ Technology Stack

**Frontend:**
- React 18
- Vite
- TailwindCSS
- Shadcn/ui
- Framer Motion
- React Router
- Zustand (State Management)

**Backend:**
- Node.js + Express (Microservices)
- Python + FastAPI (AI Services)
- MongoDB (Database)
- JWT Authentication
- Nodemailer (Email)

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

- **Taimoor Raza Asif** - Full Stack Developer
- **Hamza Aftab** - UX Designer
- **Abdullah Ghani** - Data Scientist

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support, visit the About page in the application or email: taimoorrazaasif581@gmail.com
