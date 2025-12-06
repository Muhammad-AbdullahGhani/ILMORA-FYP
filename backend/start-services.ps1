# backend/start-services.ps1
# ILM-ORA Services Startup Script
# Run all microservices locally for development

Write-Host "Starting ILM-ORA Microservices..." -ForegroundColor Green
Write-Host ""

# Function to start a service in a new window
function Start-Service {
    param(
        [string]$ServiceName,
        [string]$Path,
        [string]$Command,
        [int]$Port
    )
    
    Write-Host "Starting $ServiceName on port $Port..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$Path'; Write-Host '$ServiceName Running on Port $Port' -ForegroundColor Blue; $Command"
}

# Start Gateway (must start first)
Write-Host "1. Starting API Gateway..." -ForegroundColor Yellow
Start-Service -ServiceName "Gateway" -Path "$PSScriptRoot\services\gateway" -Command "npm run dev" -Port 3000
Start-Sleep -Seconds 3

# Start Auth Service
Write-Host "2. Starting Auth Service..." -ForegroundColor Yellow
Start-Service -ServiceName "Auth Service" -Path "$PSScriptRoot\services\auth-service" -Command "npm run dev" -Port 3008
Start-Sleep -Seconds 2

# Start Quiz Service
Write-Host "3. Starting Quiz Service..." -ForegroundColor Yellow
Start-Service -ServiceName "Quiz Service" -Path "$PSScriptRoot\services\quiz-service" -Command "npm run dev" -Port 3002
Start-Sleep -Seconds 2

# Start Recommendation Service
Write-Host "4. Starting Recommendation Service..." -ForegroundColor Yellow
Start-Service -ServiceName "Recommendation" -Path "$PSScriptRoot\services\recommendation-service" -Command "npm run dev" -Port 3003
Start-Sleep -Seconds 2

# Start Sentiment Service
Write-Host "5. Starting Sentiment Service..." -ForegroundColor Yellow
Start-Service -ServiceName "Sentiment" -Path "$PSScriptRoot\services\sentiment-service" -Command "npm run dev" -Port 3004
Start-Sleep -Seconds 2

# Start Python Sentiment Service (Required for University Service)
Write-Host "6a. Starting Python Sentiment Service..." -ForegroundColor Yellow
Start-Service -ServiceName "Python Sentiment" -Path "$PSScriptRoot\services\university-service\scripts" -Command "python sentiment_service_python.py" -Port 5000
Start-Sleep -Seconds 5

# Start University Service
Write-Host "6b. Starting University Service..." -ForegroundColor Yellow
Start-Service -ServiceName "University" -Path "$PSScriptRoot\services\university-service" -Command "npm run dev" -Port 3005
Start-Sleep -Seconds 2

# Start Career Service
Write-Host "7. Starting Career Service..." -ForegroundColor Yellow
Start-Service -ServiceName "Career" -Path "$PSScriptRoot\services\career-service" -Command "npm run dev" -Port 3006
Start-Sleep -Seconds 2

# Start Admin Service
Write-Host "8. Starting Admin Service..." -ForegroundColor Yellow
Start-Service -ServiceName "Admin" -Path "$PSScriptRoot\services\admin-service" -Command "npm run dev" -Port 3007
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "All services started!" -ForegroundColor Green
Write-Host ""
Write-Host "Gateway: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Auth: http://localhost:3008" -ForegroundColor Cyan
Write-Host "Quiz: http://localhost:3002" -ForegroundColor Cyan
Write-Host "Recommendation: http://localhost:3003" -ForegroundColor Cyan
Write-Host "Sentiment: http://localhost:3004" -ForegroundColor Cyan
Write-Host "Python AI: http://localhost:5000" -ForegroundColor Cyan
Write-Host "University: http://localhost:3005" -ForegroundColor Cyan
Write-Host "Career: http://localhost:3006" -ForegroundColor Cyan
Write-Host "Admin: http://localhost:3007" -ForegroundColor Cyan
Write-Host ""
Write-Host "Health Check: http://localhost:3000/health" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to exit this script (services will continue running)" -ForegroundColor Gray
Write-Host "To stop all services, close all PowerShell windows" -ForegroundColor Gray
Write-Host ""

# Keep script running
while ($true) {
    Start-Sleep -Seconds 10
}