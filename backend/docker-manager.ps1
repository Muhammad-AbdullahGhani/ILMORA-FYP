# Docker Compose Management Script for ILM-ORA
# Usage: .\docker-manager.ps1 [command]

param(
    [Parameter(Position=0)]
    [ValidateSet('start', 'stop', 'restart', 'logs', 'status', 'clean', 'build', 'rebuild')]
    [string]$Command = 'start'
)

$BackendPath = "c:\Users\User\Desktop\FYP-ILM-ORA\backend"

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

Set-Location $BackendPath

switch ($Command) {
    'start' {
        Write-Info "Starting all ILM-ORA services..."
        docker-compose up -d
        if ($LASTEXITCODE -eq 0) {
            Write-Success "All services started successfully!"
            Write-Info "Gateway: http://localhost:3000"
            Write-Info "Run '.\docker-manager.ps1 logs' to view logs"
            Write-Info "Run '.\docker-manager.ps1 status' to check status"
        } else {
            Write-Error "Failed to start services. Check logs for details."
        }
    }
    
    'stop' {
        Write-Info "Stopping all services..."
        docker-compose down
        if ($LASTEXITCODE -eq 0) {
            Write-Success "All services stopped successfully!"
        }
    }
    
    'restart' {
        Write-Info "Restarting all services..."
        docker-compose restart
        if ($LASTEXITCODE -eq 0) {
            Write-Success "All services restarted successfully!"
        }
    }
    
    'logs' {
        Write-Info "Showing logs (Ctrl+C to exit)..."
        docker-compose logs -f
    }
    
    'status' {
        Write-Info "Service status:"
        docker-compose ps
    }
    
    'clean' {
        Write-Warning "This will stop all services and remove volumes (database data will be lost)"
        $confirmation = Read-Host "Are you sure? (yes/no)"
        if ($confirmation -eq 'yes') {
            Write-Info "Cleaning up..."
            docker-compose down -v
            Write-Success "Cleanup complete!"
        } else {
            Write-Info "Cleanup cancelled"
        }
    }
    
    'build' {
        Write-Info "Building all services..."
        docker-compose build
        if ($LASTEXITCODE -eq 0) {
            Write-Success "All services built successfully!"
        }
    }
    
    'rebuild' {
        Write-Info "Rebuilding and starting all services..."
        docker-compose up -d --build
        if ($LASTEXITCODE -eq 0) {
            Write-Success "All services rebuilt and started successfully!"
            Write-Info "Gateway: http://localhost:3000"
        }
    }
}

Write-Host ""
Write-Host "Available commands:" -ForegroundColor Yellow
Write-Host "  start    - Start all services in background"
Write-Host "  stop     - Stop all services"
Write-Host "  restart  - Restart all services"
Write-Host "  logs     - Show live logs"
Write-Host "  status   - Show service status"
Write-Host "  clean    - Stop and remove all data (dangerous!)"
Write-Host "  build    - Build all service images"
Write-Host "  rebuild  - Rebuild and start all services"
