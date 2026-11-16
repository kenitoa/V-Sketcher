param([string]$Project = (Join-Path $PSScriptRoot 'results/projects/premium/project.json'))
$ErrorActionPreference='Stop'
$taskPython=Join-Path $PSScriptRoot '..\..\.venv-phase03\Scripts\pythonw.exe'
$taskViewer=Join-Path $PSScriptRoot 'viewer.py'
if (-not (Test-Path -LiteralPath $taskPython)) { throw 'Read experiments/phase03/README.md and create .venv-phase03 first.' }
$taskArguments=@(('"'+$taskViewer+'"'))
if (Test-Path -LiteralPath $Project) { $taskArguments+=@('--project',('"'+[IO.Path]::GetFullPath($Project)+'"')) }
Start-Process -FilePath $taskPython -ArgumentList $taskArguments -WindowStyle Hidden
