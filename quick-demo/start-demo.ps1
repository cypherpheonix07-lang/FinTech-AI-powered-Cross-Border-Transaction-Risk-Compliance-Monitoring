# Quick Demo Auto-Setup Script for Windows (PowerShell)
# Installs deps, starts ML mock (8000), Backend (4000), Frontend (3000)
$ErrorActionPreference = "Continue"

$DemoDir = "$PSScriptRoot"
if (-not $DemoDir) { $DemoDir = (Get-Location).Path }

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " TransactTrace Quick Demo Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Install dependencies
Write-Host ">> [1/4] Installing dependencies..." -ForegroundColor Yellow
Set-Location $DemoDir
npm install --no-audit --no-fund --loglevel=error 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "   npm install had warnings but continuing..." -ForegroundColor DarkYellow
}
Write-Host "   Done." -ForegroundColor Green

# Step 2: Start Mock ML (port 8000)
Write-Host ">> [2/4] Starting Mock ML Service (port 8000)..." -ForegroundColor Yellow
$mlProc = Start-Process -FilePath "node" -ArgumentList "ml-mock.js" -WorkingDirectory $DemoDir -PassThru -WindowStyle Hidden -RedirectStandardOutput "$DemoDir\ml.log" -RedirectStandardError "$DemoDir\ml-err.log"
Start-Sleep -Milliseconds 800
Write-Host "   ML PID: $($mlProc.Id)" -ForegroundColor Green

# Step 3: Start Mock Backend (port 4000)
Write-Host ">> [3/4] Starting Mock Backend (port 4000)..." -ForegroundColor Yellow
$backendProc = Start-Process -FilePath "node" -ArgumentList "backend-mock.js" -WorkingDirectory $DemoDir -PassThru -WindowStyle Hidden -RedirectStandardOutput "$DemoDir\backend.log" -RedirectStandardError "$DemoDir\backend-err.log"
Start-Sleep -Milliseconds 800
Write-Host "   Backend PID: $($backendProc.Id)" -ForegroundColor Green

# Step 4: Start Static Frontend (port 3000)
Write-Host ">> [4/4] Starting Frontend (port 3000)..." -ForegroundColor Yellow
$frontendProc = Start-Process -FilePath "npx" -ArgumentList "http-server","public","-p","3000","-c-1" -WorkingDirectory $DemoDir -PassThru -WindowStyle Hidden -RedirectStandardOutput "$DemoDir\frontend.log" -RedirectStandardError "$DemoDir\frontend-err.log"
Start-Sleep -Milliseconds 800
Write-Host "   Frontend PID: $($frontendProc.Id)" -ForegroundColor Green

# Save PIDs for cleanup
"$($mlProc.Id)`n$($backendProc.Id)`n$($frontendProc.Id)" | Out-File "$DemoDir\pids.txt" -Encoding utf8

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " ALL SERVICES STARTED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host " Frontend:  http://localhost:3000" -ForegroundColor White
Write-Host " Backend:   http://localhost:4000" -ForegroundColor White
Write-Host " ML Mock:   http://localhost:8000" -ForegroundColor White
Write-Host ""
Write-Host " Logs: ml.log, backend.log, frontend.log" -ForegroundColor DarkGray
Write-Host " PIDs: $($mlProc.Id), $($backendProc.Id), $($frontendProc.Id)" -ForegroundColor DarkGray
Write-Host ""
Write-Host " To stop all:" -ForegroundColor Yellow
Write-Host "   Get-Content pids.txt | ForEach { Stop-Process -Id `$_ -Force -ErrorAction SilentlyContinue }" -ForegroundColor DarkYellow
Write-Host ""

# Open browser
Start-Process "http://localhost:3000"
Write-Host " Browser opened to http://localhost:3000" -ForegroundColor Green
