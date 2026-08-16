@echo off
cd /d %~dp0

echo ================================================
echo   RECONSTRUCTION COMPLETE - Gestion Fer
echo   (a utiliser apres un git pull avec changement
echo    de code, pour forcer la mise a jour Docker)
echo ================================================
echo.

docker info >nul 2>&1
if errorlevel 1 (
    echo Docker non disponible. En mode Python, un simple
    echo redemarrage suffit ^(pas besoin de reconstruction^).
    echo Utilisez : stop.bat puis smart-start.bat
    pause
    exit /b
)

echo Arret des conteneurs actuels...
docker compose down

echo Reconstruction complete de l'image...
docker compose up --build -d

echo.
echo ================================================
echo   OK ! Application reconstruite et relancee.
echo   http://localhost:5000
echo ================================================
timeout /t 3 >nul
start http://localhost:5000
pause
