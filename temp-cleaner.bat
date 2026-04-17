@echo off
setlocal

set "SCRIPT_DIR=%~dp0"

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Erreur: Node.js n'est pas installe.
    echo Telechargez Node.js: https://nodejs.org/
    exit /b 1
)

node "%SCRIPT_DIR%temp-cleaner.js" %*
