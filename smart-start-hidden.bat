@echo off
cd /d %~dp0

echo [%date% %time%] Demarrage automatique >> logs.txt

docker info >nul 2>&1
if errorlevel 1 (
    echo [%date% %time%] Mode Python (Docker indisponible) >> logs.txt
    if exist "{backend" rmdir /s /q "{backend"
    if not exist "data" mkdir data
    cd backend
    set DATABASE_PATH=%~dp0data\fer.db
    python app.py >> %~dp0logs.txt 2>&1
) else (
    echo [%date% %time%] Mode Docker >> logs.txt
    docker compose up --build -d >> logs.txt 2>&1
)
