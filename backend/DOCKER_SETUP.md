# Docker Compose Setup Guide

## Overview
This Docker Compose configuration runs all ILM-ORA microservices in containers with proper networking and dependencies.

## Services Included

### 1. Gateway (Port 3000)
- **Purpose**: API Gateway - Entry point for all frontend requests
- **Technology**: Node.js + Express
- **Routes**: Proxies requests to all microservices
- **Dependencies**: All other microservices

### 2. Auth Service (Port 3001)
- **Purpose**: Authentication and authorization
- **Technology**: Node.js + Express
- **Database**: MongoDB (auth-db)
- **Features**: JWT-based authentication

### 3. Quiz Service (Port 3002)
- **Purpose**: Adaptive quiz system
- **Technology**: Python + FastAPI
- **Features**: Gamified quiz questions with adaptive difficulty

### 4. Recommendation Service (Port 3003)
- **Purpose**: Degree and program recommendations
- **Technology**: Python + FastAPI
- **Features**: ML-based recommendations

### 5. Sentiment Service (Port 3004)
- **Purpose**: Sentiment analysis for reviews
- **Technology**: Python + FastAPI
- **Features**: NLP-based sentiment analysis

### 6. University Service (Port 3005)
- **Purpose**: University data and review management
- **Technology**: Node.js + Express
- **Database**: MongoDB (university-db)
- **Dependencies**: Python Sentiment Service (Port 5000)
- **Features**: University listings, reviews, programs, scholarships

### 7. Python Sentiment Service (Port 5000)
- **Purpose**: DeBERTa-based sentiment analysis
- **Technology**: Python + Flask/FastAPI
- **Features**: Deep learning sentiment classification

### 8. Career Service (Port 3006)
- **Purpose**: Career guidance and exploration
- **Technology**: Node.js + Express
- **Features**: Career paths, job market insights

### 9. Admin Service (Port 3007)
- **Purpose**: Administrative operations
- **Technology**: Node.js + Express
- **Features**: System management, user management

## Prerequisites

1. **Docker Desktop**: Install from [docker.com](https://www.docker.com/products/docker-desktop)
2. **Docker Compose**: Included with Docker Desktop
3. **Minimum Resources**:
   - RAM: 8GB recommended
   - Disk Space: 10GB free
   - CPU: 4 cores recommended

## Quick Start

### 1. Build and Start All Services
```powershell
cd c:\Users\User\Desktop\FYP-ILM-ORA\backend
docker-compose up --build
```

### 2. Start in Detached Mode (Background)
```powershell
docker-compose up -d --build
```

### 3. View Logs
```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f gateway
docker-compose logs -f university-service
```

### 4. Check Service Status
```powershell
docker-compose ps
```

### 5. Stop All Services
```powershell
docker-compose down
```

### 6. Stop and Remove Volumes (Clean Reset)
```powershell
docker-compose down -v
```

## Service URLs

When running with docker-compose:
- **Gateway**: http://localhost:3000
- **Auth Service**: http://localhost:3001
- **Quiz Service**: http://localhost:3002
- **Recommendation Service**: http://localhost:3003
- **Sentiment Service**: http://localhost:3004
- **University Service**: http://localhost:3005
- **Career Service**: http://localhost:3006
- **Admin Service**: http://localhost:3007
- **Python Sentiment**: http://localhost:5000

## Frontend Configuration

Update your frontend to use the gateway:

```javascript
// In vite.config.js (already configured)
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  }
}
```

All frontend API calls should use relative URLs:
```javascript
// ✅ Correct
fetch('/api/universities')
fetch('/api/quiz/start')

// ❌ Incorrect
fetch('http://localhost:3005/api/universities')
```

## Environment Variables

Key environment variables (defined in docker-compose.yml):

### Gateway
- `PORT`: 3000
- `NODE_ENV`: production
- `JWT_SECRET`: Your secret key
- `CORS_ORIGIN`: Frontend URL
- `*_SERVICE_URL`: URLs of all microservices

### Auth Service
- `PORT`: 3001
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Must match gateway secret

### University Service
- `PORT`: 3005
- `MONGO_URI`: MongoDB connection string
- `PYTHON_SENTIMENT_URL`: Python sentiment service URL

## Networking

All services communicate via the `ilm-ora-network` bridge network:
- Services can reach each other by service name (e.g., `http://auth-service:3001`)
- External access via exposed ports (e.g., `localhost:3000`)

## Data Persistence

Volumes for data persistence:
- `auth-db-data`: Auth service MongoDB data
- `university-db-data`: University service MongoDB data
- `../shared`: Shared data folder (universities JSON, etc.)

## Troubleshooting

### Service Won't Start
```powershell
# Check logs
docker-compose logs <service-name>

# Rebuild specific service
docker-compose up --build <service-name>
```

### Port Conflicts
```powershell
# Check what's using a port
netstat -ano | findstr :3000

# Kill process if needed
taskkill /PID <PID> /F
```

### Database Connection Issues
```powershell
# Check if MongoDB containers are running
docker-compose ps auth-db university-db

# Restart databases
docker-compose restart auth-db university-db
```

### Clear Everything and Restart
```powershell
# Stop all containers
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Rebuild from scratch
docker-compose up --build
```

### Gateway Can't Reach Services
```powershell
# Check network connectivity
docker-compose exec gateway ping auth-service
docker-compose exec gateway ping university-service

# Inspect network
docker network inspect backend_ilm-ora-network
```

## Development vs Production

### Development Mode
```powershell
# Use docker-compose.yml with watch mode
docker-compose up

# Or run services locally for faster development
npm run dev  # in each service directory
```

### Production Mode
```powershell
# Use production builds
docker-compose -f docker-compose.yml up -d

# Or use docker-compose.prod.yml (if created)
docker-compose -f docker-compose.prod.yml up -d
```

## Health Checks

Test service health:
```powershell
# Gateway health
curl http://localhost:3000/health

# Individual service health (via gateway)
curl http://localhost:3000/api/auth/health
curl http://localhost:3000/api/universities/health
```

## Scaling Services

Scale specific services:
```powershell
# Run multiple instances
docker-compose up -d --scale university-service=3
```

## Building Individual Services

```powershell
# Build single service
docker-compose build gateway

# Build without cache
docker-compose build --no-cache university-service
```

## Resource Monitoring

```powershell
# View resource usage
docker stats

# Check specific container
docker stats <container_name>
```

## Common Commands Reference

```powershell
# Start services
docker-compose up                    # Foreground
docker-compose up -d                 # Background
docker-compose up --build            # Rebuild and start

# Stop services
docker-compose stop                  # Stop without removing
docker-compose down                  # Stop and remove containers
docker-compose down -v               # Also remove volumes

# Logs
docker-compose logs                  # All logs
docker-compose logs -f gateway       # Follow gateway logs
docker-compose logs --tail=100       # Last 100 lines

# Execute commands in containers
docker-compose exec gateway sh       # Shell access
docker-compose exec auth-service npm list  # Run npm command

# Restart services
docker-compose restart               # All services
docker-compose restart gateway       # Single service
```

## Next Steps

1. ✅ Ensure all services build successfully
2. ✅ Start all services: `docker-compose up`
3. ✅ Test gateway health: http://localhost:3000/health
4. ✅ Test frontend connection through gateway
5. ✅ Verify database connectivity
6. ✅ Check all microservice endpoints

## Support

For issues:
1. Check logs: `docker-compose logs <service-name>`
2. Verify environment variables in docker-compose.yml
3. Ensure all Dockerfiles are present
4. Check port availability
5. Verify shared data folder exists

## Architecture Diagram

```
Frontend (Vite:3001) 
    ↓ /api/*
Gateway (Node:3000) 
    ├→ Auth Service (Node:3001) → MongoDB
    ├→ Quiz Service (Python:3002)
    ├→ Recommendation Service (Python:3003)
    ├→ Sentiment Service (Python:3004)
    ├→ University Service (Node:3005) → MongoDB + Python Sentiment (5000)
    ├→ Career Service (Node:3006)
    └→ Admin Service (Node:3007)
```
