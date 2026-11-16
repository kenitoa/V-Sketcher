param(
    [string]$OutputPath = (Join-Path $PSScriptRoot 'results/environment-current.json'),
    [ValidatePattern('^[A-Z0-9-]+$')][string]$EnvironmentId = 'ENV-WIN-001'
)
$ErrorActionPreference = 'Stop'
$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

# Inventory only: no frames/audio, serial numbers, host name, user name or device IDs.
$taskOs = Get-CimInstance Win32_OperatingSystem
$taskCpus = @(Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors)
$taskGpus = @(Get-CimInstance Win32_VideoController | ForEach-Object {
    [ordered]@{name=$_.Name; driver_version=$_.DriverVersion; driver_date=$_.DriverDate.ToString('yyyy-MM-dd'); resolution=@($_.CurrentHorizontalResolution,$_.CurrentVerticalResolution)}
})
$taskDevices = @(Get-PnpDevice -PresentOnly | Where-Object { $_.Class -in @('Camera','Image','AudioEndpoint','Media') } | Select-Object Class,FriendlyName,Status)
$taskDrivers = @(Get-CimInstance Win32_PnPSignedDriver | Where-Object { $_.DeviceClass -in @('CAMERA','IMAGE','MEDIA') } | ForEach-Object {
    [ordered]@{name=$_.DeviceName; version=$_.DriverVersion; provider=$_.DriverProviderName; date=if ($_.DriverDate) {$_.DriverDate.ToString('yyyy-MM-dd')} else {$null}}
})
$taskObsCandidates = @(
    (Join-Path $env:ProgramFiles 'obs-studio\bin\64bit\obs64.exe'),
    (Join-Path ${env:ProgramFiles(x86)} 'obs-studio\bin\64bit\obs64.exe')
)
$taskObsVersions = @($taskObsCandidates | Where-Object {Test-Path -LiteralPath $_} | ForEach-Object {(Get-Item -LiteralPath $_).VersionInfo.ProductVersion})
$taskObsRunning = @(Get-Process -Name obs64 -ErrorAction SilentlyContinue).Count -gt 0
$taskLabPython = Join-Path $PSScriptRoot '..\..\.venv-lab\Scripts\python.exe'
$taskPython = (& $taskLabPython -c 'import platform; print(platform.python_version())').Trim()
$taskPackages = (& $taskLabPython -m pip list --format=json | ConvertFrom-Json)
$taskDependencyRows = @($taskPackages | ForEach-Object { [ordered]@{name=$_.name; version=$_.version} })
$taskNvidia = @()
if (Get-Command nvidia-smi -ErrorAction SilentlyContinue) {
    $taskNvidia = @(& nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv,noheader,nounits | ConvertFrom-Csv -Header name,memory_mib,driver_version)
}
$taskData = [ordered]@{
    schema_version=1; environment_id=$EnvironmentId; collected_at_utc=[DateTime]::UtcNow.ToString('o')
    purpose='phase02 candidate environment inventory; not minimum requirements or hardware benchmark'
    operating_system=[ordered]@{name=$taskOs.Caption; version=$taskOs.Version; build=$taskOs.BuildNumber; architecture=$taskOs.OSArchitecture; visible_ram_gib=[math]::Round($taskOs.TotalVisibleMemorySize/1MB,2)}
    cpu=$taskCpus; gpu=$taskGpus; nvidia_inventory=$taskNvidia; present_devices=$taskDevices; media_drivers=$taskDrivers
    tools=[ordered]@{python=$taskPython; pillow=($taskPackages | Where-Object {$_.name -eq 'pillow'}).version; node=(& node --version); npm=(& npm.cmd --version); powershell=$PSVersionTable.PSVersion.ToString()}
    obs=[ordered]@{standard_location_versions=$taskObsVersions; process_running=$taskObsRunning; portable_installation='not_searched'; connection_test='not_run'}
    input_conditions=[ordered]@{camera='HD Webcam enumerated; permission/resolution/FPS/openability not tested'; microphone='present audio endpoints inventoried; headset connection not confirmed'; driver_enumeration='inventory only, does not prove successful input'; capture='no camera frames or microphone audio captured'}
    dependencies=$taskDependencyRows
}
$taskOutputFull = [IO.Path]::GetFullPath($OutputPath)
[IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($taskOutputFull)) | Out-Null
[IO.File]::WriteAllText($taskOutputFull, ($taskData | ConvertTo-Json -Depth 9) + "`n", [System.Text.UTF8Encoding]::new($false))
Write-Output "Saved $EnvironmentId inventory without host/user/serial identifiers or raw input."
