# TransactTrace-Nexus Build Instructions

## 🚀 Quick Start (No Turbo, Direct Build)

The project has been restructured to **remove turbo dependency** and use direct npm scripts.

### Option 1: Docker (Recommended for Full Stack)

```bash
# From project root
cd "c:\Users\user\OneDrive\Desktop\CODING PROJECTS\PROJECT-THANDAV\TransactTrace-Nexus"

# Start everything
docker-compose up -d --build

# Check logs
docker-compose logs -f backend fraud-ml
```

### Option 2: Local Development (Frontend Only)

```bash
# Navigate to frontend
cd "FinTech — AI-powered Cross-Border Transaction Risk & Compliance Monitoring"

# Install dependencies (first time)
npm install

# Run dev server
npm run dev
```

### Option 3: Local Development (Backend Only)

```bash
# Navigate to backend
cd "FinTech — AI-powered Cross-Border Transaction Risk & Compliance Monitoring\backend"

# Install dependencies (first time)
npm install

# Generate Prisma client
npx prisma generate

# Run dev server
npm run dev
```

### Option 4: Full Local Stack (Frontend + Backend)

```bash
# From project root
npm install

# Run both (in parallel)
npm run dev

# OR build both
npm run build
```

## 📁 Project Structure

```
TransactTrace-Nexus/
├── package.json                          # Root orchestrator (NO turbo)
├── docker-compose.yml                     # Full stack orchestration
├── turbo.json                            # (Optional, not used)
├── FinTech — AI.../                      # Frontend workspace
│   ├── package.json                       # Vite build scripts
│   ├── backend/                           # Backend workspace (nested)
│   │   ├── package.json                   # TypeScript build scripts
│   │   ├── prisma/
│   │   └── src/
│   └── src/
├── fraud-ml-service/                      # Python ML service
├── ml/                                    # Training scripts
├── data/                                  # Datasets
└── scripts/                               # Automation scripts
```

## 🔧 Available Root Commands

- `npm run dev` - Run frontend + backend in parallel
- `npm run build` - Build frontend + backend
- `npm run dev:frontend` - Frontend only
- `npm run dev:backend` - Backend only
- `npm run docker:up` - Start Docker stack
- `npm run docker:down` - Stop Docker stack

## 🐛 Troubleshooting

### "turbo not found"
✅ **FIXED** - Turbo removed, using direct npm scripts now

### "Cannot find module"
```bash
# In frontend folder
npm install

# In backend folder
cd backend
npm install
npx prisma generate
```

### "Port already in use"
```bash
# Frontend (3000)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Backend (4000)
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

## 🎯 Next Steps

1. **First Time Setup**:
   ```bash
   npm install
   cd "FinTech — AI-powered Cross-Border Transaction Risk & Compliance Monitoring\backend"
   npx prisma generate
   npx prisma migrate dev --name init
   ```

2. **Run Full Stack**:
   ```bash
   docker-compose up -d --build
   ```

3. **Test**:
   ```bash
   node scripts/register_and_test.js
   ```
