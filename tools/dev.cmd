@echo off
setlocal
set "ROOT=%~dp0.."
set "NODEDIR=%ROOT%\.local\toolchain\node-v24.22.3-win-x64"
if not exist "%NODEDIR%\node.exe" (
  echo Run python scripts/bootstrap.py first.
  exit /b 1
)
set "PATH=%NODEDIR%;%PATH%"
"%NODEDIR%\node.exe" "%NODEDIR%\node_modules\npm\bin\npm-cli.js" %*
