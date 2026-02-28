@echo off
echo ================================================================
echo   KUBERA TRACE: FULL SIMULATION ^& STABILITY SUITE v2.0
echo ================================================================
echo.

echo [STAGE 1/5] Running Expanded Unit Tests (17 tests)...
pytest -q backend/tests/test_ecosystem.py
if %ERRORLEVEL% NEQ 0 (
  echo [FAIL] Unit tests failed!
  exit /b %ERRORLEVEL%
) else (
  echo [PASS] All unit tests passed.
)
echo.

echo [STAGE 2/5] Running Workflow Simulation (E2E Happy Path)...
python backend/simulation/workflow_sim.py
if %ERRORLEVEL% NEQ 0 (
  echo [FAIL] Workflow simulation failed!
  exit /b %ERRORLEVEL%
) else (
  echo [PASS] Workflow is logically sound.
)
echo.

echo [STAGE 3/5] Running 10-Stage Chaos Engine...
python backend/simulation/chaos_engine.py
if %ERRORLEVEL% NEQ 0 (
  echo [FAIL] Chaos engine found crashes!
  exit /b %ERRORLEVEL%
) else (
  echo [PASS] All 10 stages verified.
)
echo.

echo [STAGE 4/5] Running Frontend Static Analysis...
node scripts/frontend_scan.cjs
if %ERRORLEVEL% NEQ 0 (
  echo [FAIL] Frontend scan found critical issues!
  exit /b %ERRORLEVEL%
) else (
  echo [PASS] No critical data-flow issues.
)
echo.

echo [STAGE 5/5] Running Production Build...
call pnpm run build
if %ERRORLEVEL% NEQ 0 (
  echo [FAIL] Build failed!
  exit /b %ERRORLEVEL%
) else (
  echo [PASS] Production build successful.
)
echo.

echo ================================================================
echo   [SUCCESS] ALL 5 STAGES PASSED. PLATFORM IS STABLE.
echo ================================================================
