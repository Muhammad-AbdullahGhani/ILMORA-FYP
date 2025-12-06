# Quick Setup Script for University Images
# This script helps you download placeholder images for universities

param(
    [Parameter()]
    [switch]$UseAPI = $false,
    [Parameter()]
    [switch]$CreatePlaceholders = $true
)

$ImagesDir = "c:\Users\User\Desktop\FYP-ILM-ORA\frontend\public\images\universities"
$DataFile = "c:\Users\User\Desktop\FYP-ILM-ORA\backend\shared\data\universities data\universities intro details\universities_with_ratio.json"

Write-Host "🎓 University Images Setup Script" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# Ensure directory exists
if (!(Test-Path $ImagesDir)) {
    New-Item -ItemType Directory -Path $ImagesDir -Force | Out-Null
    Write-Host "✅ Created images directory" -ForegroundColor Green
}

# Read university data
if (Test-Path $DataFile) {
    $universities = Get-Content $DataFile | ConvertFrom-Json
    Write-Host "📚 Found $($universities.Count) universities" -ForegroundColor Yellow
    
    # Get unique university names
    $uniqueUniversities = $universities | Select-Object -ExpandProperty University -Unique | Where-Object { $_ }
    
    Write-Host "`n🏫 Universities that need images:" -ForegroundColor Cyan
    $counter = 1
    foreach ($uni in $uniqueUniversities | Select-Object -First 20) {
        $normalizedName = $uni.ToLower() -replace '[^a-z0-9\s-]', '' -replace '\s+', '-' -replace '-+', '-'
        $imagePath = Join-Path $ImagesDir "$normalizedName.jpg"
        
        if (!(Test-Path $imagePath)) {
            Write-Host "  $counter. $uni" -ForegroundColor Yellow
            Write-Host "     → Filename: $normalizedName.jpg" -ForegroundColor DarkGray
            $counter++
        }
    }
    
    Write-Host "`n📝 Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Download images for these universities from:" -ForegroundColor White
    Write-Host "   - Official university websites" -ForegroundColor DarkGray
    Write-Host "   - Wikipedia (check licensing)" -ForegroundColor DarkGray
    Write-Host "   - Unsplash/Pexels (free stock photos)" -ForegroundColor DarkGray
    Write-Host "`n2. Save images to:" -ForegroundColor White
    Write-Host "   $ImagesDir" -ForegroundColor DarkGray
    Write-Host "`n3. Name files using the normalized names shown above" -ForegroundColor White
    Write-Host "`n4. Run the update script:" -ForegroundColor White
    Write-Host "   cd backend" -ForegroundColor DarkGray
    Write-Host "   node scripts/add-university-images.js" -ForegroundColor DarkGray
    
} else {
    Write-Host "❌ University data file not found!" -ForegroundColor Red
    Write-Host "   Expected: $DataFile" -ForegroundColor Yellow
}

Write-Host "`n✨ Setup complete!" -ForegroundColor Green
