@echo off
setlocal EnableDelayedExpansion
cd /d %~dp0

echo ================================================
echo   DEMARRAGE INTELLIGENT - Gestion Fer
echo ================================================
echo.

REM --- Detection : Docker est-il installe ET fonctionnel ? ---
echo [1/2] Detection de l'environnement...
docker info >nul 2>&1
if errorlevel 1 (
    echo    Docker non disponible ou non demarre.
    echo    -^> Mode PYTHON direct
    set MODE=python
) else (
    echo    Docker detecte et fonctionnel.
    echo    -^> Mode DOCKER
    set MODE=docker
)
echo.

REM --- Nettoyage dossier fantome (les deux modes) ---
if exist "{backend" rmdir /s /q "{backend"

REM ============================================
REM   MODE DOCKER
REM ============================================
if "%MODE%"=="docker" (
    echo [2/2] Lancement via Docker...
    docker compose up --build -d
    if errorlevel 1 (
        echo    ERREUR Docker. Tentative en mode Python...
        goto :python_mode
    )
    echo.
    echo ================================================
    echo   OK ! Application lancee via Docker.
    echo   http://localhost:5000
    echo ================================================
    timeout /t 3 >nul
    start http://localhost:5000
    goto :end
)

:python_mode
REM ============================================
REM   MODE PYTHON
REM ============================================
echo [2/2] Lancement via Python...

python --version >nul 2>&1
if errorlevel 1 (
    echo    Python n'est pas installe. Installation automatique...
    winget install --id Python.Python.3.12 --silent --accept-package-agreements --accept-source-agreements
    echo.
    echo    ================================================
    echo    Python a ete installe.
    echo    IMPORTANT : fermez cette fenetre et relancez
    echo    smart-start.bat une nouvelle fois.
    echo    ================================================
    pause
    exit /b 0
)

if not exist "data" mkdir data

python -m pip install --quiet --upgrade pip
cd backend
python -m pip install --quiet flask flask-cors python-dateutil
python -m pip install --quiet weasyprint >nul 2>&1
cd ..

set DATABASE_PATH=%~dp0data\fer.db
start /min cmd /c "cd /d %~dp0backend && set DATABASE_PATH=%~dp0data\fer.db && python app.py >> %~dp0logs.txt 2>&1"

echo.
echo ================================================
echo   OK ! Application lancee via Python (arriere-plan).
echo   Logs : %~dp0logs.txt
echo   http://localhost:5000
echo ================================================
timeout /t 3 >nul
start http://localhost:5000

:end
echo.
pause
