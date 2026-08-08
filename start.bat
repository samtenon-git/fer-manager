@echo off
cd /d %~dp0\backend
set DATABASE_PATH=%~dp0data\fer.db
python app.py
pause
