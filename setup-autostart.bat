@echo off
setlocal
cd /d %~dp0

echo ================================================
echo   Configuration du demarrage automatique
echo   (detecte Docker ou Python tout seul)
echo ================================================
echo.

echo Suppression de l'ancienne tache (si elle existe)...
schtasks /Delete /TN "FerManager" /F >nul 2>&1

echo Creation de la nouvelle tache planifiee...
schtasks /Create /TN "FerManager" /TR "wscript.exe \"%~dp0smart-start-silent.vbs\"" /SC ONSTART /RL HIGHEST /F

if errorlevel 1 (
    echo.
    echo ERREUR : impossible de creer la tache planifiee.
    echo Relancez ce script en tant qu'administrateur ^(clic droit^).
    pause
    exit /b 1
)

echo.
echo ================================================
echo   OK ! Au prochain demarrage de Windows,
echo   l'application se lancera automatiquement.
echo   Elle detectera Docker si present, sinon Python.
echo   Logs : %~dp0logs.txt
echo ================================================
echo.
echo Voulez-vous demarrer l'application maintenant ? (O/N)
set /p REP=
if /i "%REP%"=="O" (
    call smart-start.bat
)
