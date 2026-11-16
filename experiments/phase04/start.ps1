param(
    [ValidateSet('live', 'replay', 'external')][string]$Mode = 'live',
    [int]$Seconds = 60
)
$ErrorActionPreference = 'Stop'
$workspaceRoot = (Resolve-Path (Join-Path $PSScriptRoot '../..')).Path
$pythonExe = Join-Path $workspaceRoot '.venv-phase04/Scripts/python.exe'
if (-not (Test-Path -LiteralPath $pythonExe)) {
    throw 'Run README environment setup before starting phase04.'
}
& $pythonExe (Join-Path $PSScriptRoot 'demo.py') --mode $Mode --seconds $Seconds
if ($LASTEXITCODE -ne 0) { throw 'Phase04 demo failed; inspect the reported error.' }
