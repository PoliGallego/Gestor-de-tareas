@echo off
setlocal enabledelayedexpansion

echo Construyendo libreria ...  
cd .\ReactLibrary 
call npm run build

@REM  se necesita windos terminal 
start "" wt.exe -w 0 new-tab -d "%~dp0Login\login-frontend\gestor-tareas-login-frontend\frontend\login-usuario" powershell.exe -NoExit -Command "npm run dev" ; new-tab -d "%~dp0SignUp\signup-frontend\frontend\signup-usuario" powershell.exe -NoExit -Command "npm run dev" ; new-tab -d "%~dp0Home\home-page" powershell.exe -NoExit -Command "npm run dev" ; new-tab -d "%~dp0Principal\principal-frontend" powershell.exe -NoExit -Command "npm run dev" ; new-tab -d "%~dp0Dashboard\dashboard-frontend\dashboard" powershell.exe -NoExit -Command "npm run dev" ; new-tab -d "%~dp0Reportes\reportes-frontend\reportes" powershell.exe -NoExit -Command "npm run dev"