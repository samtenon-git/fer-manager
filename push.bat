@echo off
cd /d %~dp0
echo ========================================
echo   Envoi des modifications vers GitHub
echo ========================================
echo.
set /p MSG="Nom de cette version (ex: ajout facture achat): "

if "%MSG%"=="" (
    echo Aucun nom donne, annulation.
    pause
    exit /b
)

echo.
echo Ajout des fichiers...
git add .

echo Creation du commit...
git commit -m "%MSG%"

echo Envoi vers GitHub...
git push

echo.
echo ========================================
echo   Termine !
echo ========================================
pause
