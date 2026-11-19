@echo off
setlocal
set "ROOT=%~dp0.."
"%ROOT%\.venv-product\Scripts\python.exe" -I "%ROOT%\scripts\research-restore.py" research-torch research-weights
if errorlevel 1 exit /b %errorlevel%
"%ROOT%\.local\research31\triposr-env\Scripts\python.exe" -I "%ROOT%\tools\three-d-learned.py" %*
