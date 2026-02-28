@echo off
REM Heavy-handed build fix script for TransactTrace-Nexus
REM This script bypasses all turbo issues and builds directly

echo ========================================
echo TransactTrace-Nexus - Brutal Build Fix
echo ========================================
echo.

set ROOT=%~dp0
cd /d "%ROOT%"

echo [1/5] Installing root dependencies...
call npm install
if errorlevel 1 (
    echo WARNING: Root npm install had issues, continuing...
)

echo.
echo [2/5] Installing frontend dependencies...
cd "FinTech — AI-powered Cross-Border Transaction Risk & Compliance Monitoring"
call npm install
if errorlevel 1 (
    echo ERROR: Frontend npm install failed!
    pause
    exit /b 1
)

echo.
echo [3/5] Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Backend npm install failed!
    pause
    exit /b 1
)

echo.
echo [4/5] Generating Prisma client...
call npx prisma generate
if errorlevel 1 (
    echo WARNING: Prisma generate had issues, continuing...
)

echo.
echo [5/5] Building backend...
call npm run build
if errorlevel 1 (
    echo ERROR: Backend build failed!
    pause
    exit /b 1
)

cd ..\..

echo.
echo ========================================
echo BUILD COMPLETE!
echo ========================================
echo.
echo You can now run:
echo   - npm run dev (from root)
echo   - docker-compose up -d --build
echo.
pause
