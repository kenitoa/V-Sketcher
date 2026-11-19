@echo off
setlocal
set "ROOT=%~dp0.."
"%ROOT%\.venv-product\Scripts\python.exe" -I "%ROOT%\scripts\cache-archive.py" %*
