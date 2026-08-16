@echo off
setlocal EnableDelayedExpansion
cd /d %~dp0

echo ================================================
echo   INSTALLATION DES PREREQUIS - Gestion Fer
echo   (a utiliser sur un nouveau PC, ou si Python
echo    ou d'autres outils manquent)
echo ================================================
echo.

REM --- Nettoyage dossiers fantomes ---
echo [1/4] Nettoyage des anciens dossiers...
if exist "{backend" (
    rmdir /s /q "{backend"
    echo    - Dossier fantome {backend supprime
)
if exist "backend\__pycache__" rmdir /s /q "backend\__pycache__"
if exist "backend\routes\__pycache__" rmdir /s /q "backend\routes\__pycache__"
echo    OK
echo.

REM --- Verifier / installer Python ---
echo [2/4] Verification de Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo    Python n'est pas installe. Installation automatique en cours...
    echo    Cela peut prendre 2-5 minutes selon la connexion internet.
    echo.

    winget --version >nul 2>&1
    if errorlevel 1 (
        echo    ERREUR : winget n'est pas disponible sur ce PC.
        echo    Installation manuelle requise depuis https://python.org
        echo    ^(cochez "Add python.exe to PATH" pendant l'installation^)
        pause
        exit /b 1
    )

    winget install --id Python.Python.3.12 --silent --accept-package-agreements --accept-source-agreements
    if errorlevel 1 (
        echo    ATTENTION : winget a rencontre un probleme, on reessaie avec Python 3.11...
        winget install --id Python.Python.3.11 --silent --accept-package-agreements --accept-source-agreements
    )

    echo.
    echo    ================================================
    echo    Python a ete installe.
    echo    IMPORTANT : fermez cette fenetre et relancez
    echo    install-prerequis.bat une nouvelle fois pour
    echo    verifier/terminer l'installation.
    echo    ================================================
    pause
    exit /b 0
)
python --version
echo    OK
echo.

REM --- Dossier data ---
echo [3/4] Verification du dossier data...
if not exist "data" (
    mkdir data
    echo    - Dossier data cree
) else (
    echo    - Dossier data existe deja
)
echo.

REM --- Dependances Python ---
echo [4/4] Installation des dependances Python...
python -m pip install --quiet --upgrade pip
cd backend
python -m pip install --quiet flask flask-cors python-dateutil
python -m pip install --quiet weasyprint >nul 2>&1
cd ..
echo    OK
echo.

echo ================================================
echo   INSTALLATION TERMINEE.
echo   Vous pouvez maintenant lancer : smart-start.bat
echo ================================================
pause
