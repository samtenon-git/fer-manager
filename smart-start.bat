@echo off
setlocal EnableDelayedExpansion
cd /d %~dp0

echo ================================================
echo   DEMARRAGE INTELLIGENT - Gestion Fer
echo ================================================
echo.

REM --- Nettoyage prealable : garantir qu'une seule instance tourne ---
REM Avec "restart: unless-stopped" sur le conteneur Docker, une ancienne
REM instance peut redemarrer toute seule (Windows/Docker Desktop redemarre)
REM SANS que ca se voie. Si elle tourne en meme temps qu'une instance Python
REM lancee separement, les deux ecrivent dans le MEME fichier data\fer.db,
REM ce qui cause des erreurs "database is locked" constantes. On repart donc
REM toujours d'un etat propre avant de choisir un mode.
echo [0/2] Nettoyage des instances existantes...
taskkill /F /IM python.exe >nul 2>&1
docker info >nul 2>&1
if not errorlevel 1 (
    docker compose down >nul 2>&1
)
echo    OK.
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

if exist "{backend" rmdir /s /q "{backend"

REM ============================================
REM   MODE DOCKER
REM ============================================
if "%MODE%"=="docker" (
    echo [2/2] Lancement via Docker...

    REM Verifie si l'image existe deja pour eviter un rebuild systematique
    docker images fer-manager-app --format "{{.Repository}}" 2>nul | findstr "fer-manager-app" >nul
    if errorlevel 1 (
        echo    Premiere construction de l'image, cela peut prendre du temps...
        docker compose up --build -d
    ) else (
        echo    Image existante detectee, demarrage rapide ^(sans reconstruction^)...
        docker compose up -d
        if errorlevel 1 (
            echo    Echec, tentative avec reconstruction complete...
            docker compose up --build -d
        )
    )

    if errorlevel 1 (
        echo    ERREUR Docker. Tentative en mode Python...
        goto :python_mode
    )

    echo.
    echo ================================================
    echo   OK ! Application lancee via Docker.
    echo   http://localhost:5000
    echo   Astuce : pour forcer une reconstruction complete,
    echo   utilisez rebuild.bat
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
    echo    Python n'est pas installe sur ce PC.
    echo    Lancement de install-prerequis.bat pour l'installer...
    echo.
    call "%~dp0install-prerequis.bat"
    echo.
    echo    Relancez smart-start.bat maintenant que Python est pret.
    pause
    exit /b 0
)

if not exist "data" mkdir data
set DATABASE_PATH=%~dp0data\fer.db
start /min cmd /c "cd /d %~dp0backend && set DATABASE_PATH=%~dp0data\fer.db && python app.py >> %~dp0logs.txt 2>&1"

echo.
echo ================================================
echo   OK ! Application lancee via Python (arriere-plan).
echo   Logs : %~dp0logs.txt  ^(ou lancez logs.bat^)
echo   http://localhost:5000
echo ================================================
timeout /t 3 >nul
start http://localhost:5000

:end
echo.
pause
