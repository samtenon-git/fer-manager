@echo off
cd /d %~dp0

echo ================================================
echo   LOGS EN DIRECT - Gestion Fer
echo   Ctrl+C pour arreter l'affichage
echo ================================================
echo.

if not exist "logs.txt" (
    echo Le fichier logs.txt n'existe pas encore.
    echo L'application n'a peut-etre pas encore ete lancee en mode Python.
    echo.
    echo Si vous utilisez Docker, les logs sont affiches avec :
    echo    docker compose logs -f
    echo.
    set /p LAUNCH="Voulez-vous voir les logs Docker maintenant ? (O/N) "
    if /i "%LAUNCH%"=="O" (
        docker compose logs -f
    )
    pause
    exit /b
)

powershell -Command "Get-Content -Path 'logs.txt' -Wait -Tail 30"
