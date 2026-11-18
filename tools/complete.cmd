@echo off
setlocal
set "TASKROOT=%~dp0.."
set "TASKNODE=%TASKROOT%\.local\toolchain\node-v24.22.3-win-x64\node.exe"
if not exist "%TASKNODE%" (
  echo E_COMPLETION_NODE_MISSING
  exit /b 1
)
"%TASKNODE%" "%TASKROOT%\scripts\completion.mjs" %*
