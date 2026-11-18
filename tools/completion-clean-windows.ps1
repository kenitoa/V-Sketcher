# Standalone, local-only portable probe. No policy, registry, security or account edits.
[CmdletBinding()]
param([switch]$InventoryOnly)
$ErrorActionPreference = 'Stop'
$taskRoot = [System.IO.Path]::GetFullPath($PSScriptRoot)
$taskStamp = [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss-fff')
$taskWork = Join-Path $taskRoot ('private-probe-' + $taskStamp)
$taskResult = [ordered]@{ format='2dsketcher-clean-probe/1'; candidate=$null; collectedAt=[DateTime]::UtcNow.ToString('o'); passed=$false; cleanWindowsVerified=$false; updateVerified=$false; physicalDevicesOpened=$false; securityBypasses=0; automaticUpload=$false; tests=@(); errorCode=$null }
try {
    $taskManifest = Get-Content -LiteralPath (Join-Path $taskRoot 'kit-manifest.json') -Raw -Encoding UTF8 | ConvertFrom-Json
    if ($taskManifest.format -ne '2dsketcher-completion-kit/1') { throw 'E_CLEAN_MANIFEST' }
    $taskResult.candidate = $taskManifest.candidate
    $taskZip = Join-Path $taskRoot 'candidate.zip'
    if ((Get-FileHash -LiteralPath $taskZip -Algorithm SHA256).Hash.ToLowerInvariant() -ne $taskManifest.candidate.sha256) { throw 'E_CLEAN_CANDIDATE_HASH' }
    $taskScript = $taskManifest.files | Where-Object { $_.name -eq 'Run-CleanWindows.ps1' }
    if (@($taskScript).Count -ne 1 -or (Get-FileHash -LiteralPath $PSCommandPath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $taskScript.sha256) { throw 'E_CLEAN_SCRIPT_HASH' }
    $taskResult.os = [ordered]@{ platform='windows'; version=[Environment]::OSVersion.Version.ToString(); x64=[Environment]::Is64BitOperatingSystem; logicalCores=[Environment]::ProcessorCount }
    $taskTools = @(); foreach ($taskTool in @('node','npm','python','py','git')) { if (Get-Command $taskTool -ErrorAction SilentlyContinue) { $taskTools += $taskTool } }
    $taskResult.developerToolsDetected = $taskTools
    $taskResult.developerToolsAbsent = ($taskTools.Count -eq 0)
    # A stripped PATH and new application profile do not prove a freshly provisioned OS.
    if (-not $InventoryOnly) {
        [void](New-Item -ItemType Directory -Path $taskWork)
        $taskResolved = [System.IO.Path]::GetFullPath($taskWork)
        if (-not $taskResolved.StartsWith($taskRoot + [System.IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'E_CLEAN_WORK_ROOT' }
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        $taskArchive = [System.IO.Compression.ZipFile]::OpenRead($taskZip)
        try {
            $taskBytes = [long]0; $taskEntries = @{}
            foreach ($taskEntry in $taskArchive.Entries) {
                $taskKey = $taskEntry.FullName.Replace('\','/')
                if ($taskKey.StartsWith('/') -or $taskKey.Contains(':') -or @($taskKey.Split('/') | Where-Object { $_ -eq '..' }).Count -gt 0 -or $taskEntries.ContainsKey($taskKey.ToLowerInvariant())) { throw 'E_CLEAN_ZIP_ENTRY' }
                $taskMode = ($taskEntry.ExternalAttributes -shr 16) -band 61440
                if ($taskMode -eq 40960) { throw 'E_CLEAN_ZIP_LINK' }
                $taskBytes += $taskEntry.Length; $taskEntries[$taskKey.ToLowerInvariant()] = $true
                if ($taskBytes -gt 3221225472 -or $taskEntries.Count -gt 20000) { throw 'E_CLEAN_ZIP_LIMIT' }
            }
        } finally { $taskArchive.Dispose() }
        $taskBundle = Join-Path $taskWork 'new version 한글 경로'
        [System.IO.Compression.ZipFile]::ExtractToDirectory($taskZip, $taskBundle)
        $taskExecutables = @(Get-ChildItem -LiteralPath $taskBundle -Filter '2DSketcher.exe' -Recurse -File)
        if ($taskExecutables.Count -ne 1) { throw 'E_CLEAN_EXE' }
        $taskExe = $taskExecutables[0].FullName
        $taskResult.signature = (Get-AuthenticodeSignature -LiteralPath $taskExe).Status.ToString()
        $taskWorker = Join-Path $taskExecutables[0].DirectoryName 'resources/worker/worker.exe'
        if (-not (Test-Path -LiteralPath $taskWorker -PathType Leaf)) { throw 'E_CLEAN_WORKER' }
        foreach ($taskAttempt in @(1,2)) {
            $taskProfile = Join-Path $taskWork ('profile-' + $taskAttempt)
            $taskReport = Join-Path $taskWork ('report-' + $taskAttempt + '.json')
            $taskArgs = @('"--profile-dir=' + $taskProfile + '"', '"--self-check-report=' + $taskReport + '"')
            # First: whole packaged regression. Second: persisted profile opened by fresh process.
            if ($taskAttempt -eq 2) { $taskArgs[0] = '"--profile-dir=' + (Join-Path $taskWork 'profile-1') + '"'; $taskArgs += '--settings-only=true'; $taskArgs += '--compact-editor=true' }
            $taskProc = Start-Process -FilePath $taskExe -ArgumentList $taskArgs -WorkingDirectory $taskExecutables[0].DirectoryName -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $taskWork ('private-stdout-' + $taskAttempt + '.log')) -RedirectStandardError (Join-Path $taskWork ('private-stderr-' + $taskAttempt + '.log'))
            if (-not $taskProc.WaitForExit(1200000)) { Stop-Process -InputObject $taskProc; throw 'E_CLEAN_TIMEOUT' }
            $taskProc.Refresh()
            if ($taskProc.ExitCode -ne 0 -or -not (Test-Path -LiteralPath $taskReport -PathType Leaf)) { throw 'E_CLEAN_PROCESS' }
            $taskData = Get-Content -LiteralPath $taskReport -Raw -Encoding UTF8 | ConvertFrom-Json
            $taskProtected = $taskData.protections.sandbox -eq $true -and $taskData.protections.contextIsolation -eq $true -and $taskData.protections.nodeIntegration -eq $false -and $taskData.protections.externalNetworkBlocked -eq $true
            $taskPassed = $taskData.passed -eq $true -and $taskData.appVersion -eq $taskManifest.candidate.version -and $taskData.packaged -eq $true -and $taskData.worker.frozen -eq $true -and $taskData.worker.dependencyFilesInsideBundle -eq $true -and $taskData.workerStopped -eq $true -and $taskProtected
            $taskResult.tests += [ordered]@{ attempt=$taskAttempt; passed=$taskPassed; reportSha256=(Get-FileHash -LiteralPath $taskReport -Algorithm SHA256).Hash.ToLowerInvariant(); frozenWorker=$taskData.worker.frozen; protectionsIntact=$taskProtected }
            if (-not $taskPassed) { throw 'E_CLEAN_PACKAGED_CHECK' }
        }
        $taskResult.passed = $true
    }
} catch {
    $taskCode = $_.Exception.Message
    if ($taskCode -cmatch '^E_[A-Z_]+$') { $taskResult.errorCode = $taskCode } else { $taskResult.errorCode = 'E_CLEAN_PROBE' }
} finally {
    $taskOutput = Join-Path $taskRoot ('probe-' + $taskStamp + '.json')
    $taskText = $taskResult | ConvertTo-Json -Depth 10
    # Public result is aggregate-only. Raw process output/profile stays in private-probe-*.
    [System.IO.File]::WriteAllText($taskOutput, $taskText, (New-Object System.Text.UTF8Encoding($false)))
    Write-Output ('Probe result: probe-' + $taskStamp + '.json')
}
if ($taskResult.errorCode) { exit 1 }
