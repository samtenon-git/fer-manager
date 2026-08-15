@echo off
setlocal EnableDelayedExpansion
cd /d %~dp0

echo ================================================
echo   REPARATION AUTOMATIQUE - Gestion Fer
echo ================================================
echo.

REM --- Etape 1 : nettoyer les dossiers fantomes ---
echo [1/7] Nettoyage des anciens dossiers...
if exist "{backend" (
    rmdir /s /q "{backend"
    echo    - Dossier fantome {backend supprime
)
if exist "backend\__pycache__" rmdir /s /q "backend\__pycache__"
if exist "backend\routes\__pycache__" rmdir /s /q "backend\routes\__pycache__"
echo    OK
echo.

REM --- Etape 2 : verifier Python, l'installer si absent ---
echo [2/7] Verification de Python...
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
    echo    repair.bat une nouvelle fois pour continuer
    echo    ^(necessaire pour que Windows reconnaisse Python^).
    echo    ================================================
    pause
    exit /b 0
)
python --version
echo    OK
echo.

REM --- Etape 3 : creer le dossier data si besoin ---
echo [3/7] Verification du dossier data...
if not exist "data" (
    mkdir data
    echo    - Dossier data cree
) else (
    echo    - Dossier data existe deja
)
echo.

REM --- Etape 4 : mettre a jour pip ---
echo [4/7] Mise a jour de pip...
python -m pip install --quiet --upgrade pip
echo    OK
echo.

REM --- Etape 5 : installer les dependances ---
echo [5/7] Installation des dependances Python...
cd backend
python -m pip install --quiet flask flask-cors python-dateutil
if errorlevel 1 (
    echo    ATTENTION : probleme lors de l'installation des dependances.
    echo    On continue quand meme...
) else (
    echo    OK
)
echo.

REM --- Etape 6 : tenter d'installer weasyprint (optionnel, PDF) ---
echo [6/7] Installation de WeasyPrint (PDF - optionnel)...
python -m pip install --quiet weasyprint >nul 2>&1
echo    OK (les PDF fonctionneront seulement si les librairies systeme sont presentes)
echo.

REM --- Etape 7 : lancer l'application ---
echo [7/7] Lancement de l'application...
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
