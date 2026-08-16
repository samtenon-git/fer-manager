@echo off
title Gestion Fer - Console
cd /d C:\fer-manager

echo ================================================
echo   Gestion Fer - Console
echo   Dossier : C:\fer-manager
echo ================================================
echo.
echo   .\smart-start.bat  -^> demarrer l'application
echo   .\stop.bat         -^> arreter l'application
echo   .\logs.bat         -^> voir les logs en direct
echo   .\push.bat         -^> envoyer vers GitHub
echo   git pull           -^> recuperer les dernieres modifs
echo.

powershell -NoExit -Command "cd 'C:\fer-manager'"
