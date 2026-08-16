@echo off
cd /d %~dp0

echo ================================================
echo   ARRET - Gestion Fer
echo ================================================
echo.

echo Arret des processus Python...
taskkill /F /IM python.exe >nul 2>&1
if errorlevel 1 (
    echo    Aucun processus Python en cours.
) else (
    echo    OK - Python arrete.
)
echo.

echo Arret des conteneurs Docker (si presents)...
docker info >nul 2>&1
if errorlevel 1 (
    echo    Docker non disponible, rien a arreter cote Docker.
) else (
    docker compose down >nul 2>&1
    if errorlevel 1 (
        echo    Aucun conteneur Docker en cours pour ce projet.
    ) else (
        echo    OK - Conteneurs Docker arretes.
    )
)
echo.

echo ================================================
echo   Tout est arrete.
echo ================================================
pause
