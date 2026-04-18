# PathGuard AI Initialization Script
# Automates the setup of Llama 3.1 in Ollama with GPU support check.

$OLLAMA_MODEL = "llama3.1"
$CONTAINER_NAME = "fintech_ollama"

Write-Host "----------------------------------------------------" -ForegroundColor Cyan
Write-Host "   PathGuard AI Sentinel: Model Initialization      " -ForegroundColor Cyan
Write-Host "----------------------------------------------------" -ForegroundColor Cyan

# 1. Check if Docker is running
docker ps > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Docker is not running. Please start Docker Desktop and try again." -ForegroundColor Red
    exit 1
}

# 2. Check if Ollama container is running
$is_running = docker ps --filter "name=$CONTAINER_NAME" --format "{{.Names}}"
if (-not $is_running) {
    Write-Host "🚀 Starting Docker containers..." -ForegroundColor Yellow
    docker-compose up -d ollama
    Start-Sleep -Seconds 5
}

# 3. Verify GPU capability inside the container
Write-Host "🔍 Verifying GPU availability..." -ForegroundColor Cyan
docker exec $CONTAINER_NAME ollama list > $null 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Ollama service is reachable." -ForegroundColor Green
} else {
    Write-Host "❌ Error: Could not reach Ollama service inside the container." -ForegroundColor Red
    exit 1
}

# 4. Pull the model
Write-Host "📥 Pulling model: $OLLAMA_MODEL (this may take a few minutes)..." -ForegroundColor Yellow
docker exec $CONTAINER_NAME ollama pull $OLLAMA_MODEL

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 Model $OLLAMA_MODEL successfully initialized!" -ForegroundColor Green
} else {
    Write-Host "❌ Error: Failed to pull model $OLLAMA_MODEL." -ForegroundColor Red
    exit 1
}

Write-Host "----------------------------------------------------"
Write-Host "AI Brain is now ONLINE and ready for simulations." -ForegroundColor Green
Write-Host "----------------------------------------------------"
