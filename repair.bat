@echo off
setlocal EnableDelayedExpansion
cd /d %~dp0

echo ================================================
echo   REPARATION AUTOMATIQUE - Gestion Fer
echo ================================================
echo.

REM --- Etape 1 : nettoyer les dossiers fantomes ---
echo [1/6] Nettoyage des anciens dossiers...
if exist "{backend" (
    rmdir /s /q "{backend"
    echo    - Dossier fantome {backend supprime
)
if exist "backend\__pycache__" rmdir /s /q "backend\__pycache__"
if exist "backend\routes\__pycache__" rmdir /s /q "backend\routes\__pycache__"
echo    OK
echo.

REM --- Etape 2 : verifier Python ---
echo [2/6] Verification de Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo    ERREUR : Python n'est pas installe ou pas dans le PATH.
    echo    Installez Python depuis https://python.org puis relancez ce script.
    pause
    exit /b 1
)
python --version
echo    OK
echo.

REM --- Etape 3 : creer le dossier data si besoin ---
echo [3/6] Verification du dossier data...
if not exist "data" (
    mkdir data
    echo    - Dossier data cree
) else (
    echo    - Dossier data existe deja
)
echo.

REM --- Etape 4 : installer/mettre a jour les dependances ---
echo [4/6] Installation des dependances Python...
cd backend
python -m pip install --quiet --upgrade pip
python -m pip install --quiet flask flask-cors python-dateutil
if errorlevel 1 (
    echo    ATTENTION : probleme lors de l'installation des dependances.
    echo    On continue quand meme...
) else (
    echo    OK
)
echo.

REM --- Etape 5 : tenter d'installer weasyprint (optionnel, PDF) ---
echo [5/6] Installation de WeasyPrint (PDF - optionnel)...
python -m pip install --quiet weasyprint >nul 2>&1
echo    OK (les PDF fonctionneront seulement si les librairies systeme sont presentes)
echo.

REM --- Etape 6 : lancer l'application ---
echo [6/6] Lancement de l'application...
echo ================================================
echo.
set DATABASE_PATH=%~dp0data\fer.db
python app.py

echo.
echo ================================================
echo   Le programme s'est arrete.
echo   Si vous voyez une erreur ci-dessus, faites une
echo   capture d'ecran et envoyez-la.
echo ================================================
pause
