@echo off
title Gestion Fer - C:\fer-manager
cd /d C:\fer-manager

echo ================================================
echo   Gestion Fer - Terminal pret
echo   Dossier actuel : C:\fer-manager
echo ================================================
echo.
echo Scripts disponibles :
echo   .\repair.bat   -^> reparer + lancer l'application
echo   .\start.bat    -^> lancer l'application (rapide)
echo   .\push.bat     -^> envoyer les modifs vers GitHub
echo   git pull       -^> recuperer les dernieres modifs
echo.

powershell -NoExit -Command "cd 'C:\fer-manager'"
