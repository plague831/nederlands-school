# Запуск локального сервера незалежно від PATH поточного терміналу.
#
# Потрібен, якщо термінал (або VS Code) стартував до встановлення Node.js
# і через це не бачить команду `npm`. Скрипт бере актуальний PATH
# безпосередньо з реєстру Windows, тому працює без перезавантаження.
#
# Запуск:  .\start.ps1        (або .\start.ps1 -Port 8080)

param(
    [int]$Port = 4173,
    [string]$ServerHost = '127.0.0.1'
)

$ErrorActionPreference = 'Stop'

# Актуальний PATH із реєстру — саме той, що побачить свіжий термінал.
$env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' +
            [Environment]::GetEnvironmentVariable('Path', 'User')

function Find-Node {
    $cmd = Get-Command node -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }

    # Запасний варіант: типові місця встановлення.
    $fallbacks = @(
        "$env:ProgramFiles\nodejs\node.exe",
        "${env:ProgramFiles(x86)}\nodejs\node.exe",
        "$env:LOCALAPPDATA\Programs\nodejs\node.exe"
    )
    foreach ($path in $fallbacks) {
        if (Test-Path $path) { return $path }
    }
    return $null
}

$node = Find-Node

if (-not $node) {
    Write-Host ''
    Write-Host '  Node.js не знайдено.' -ForegroundColor Red
    Write-Host '  Встанови його з https://nodejs.org/ (версія 18 або новіша),'
    Write-Host '  або виконай:  winget install OpenJS.NodeJS.LTS'
    Write-Host ''
    exit 1
}

Set-Location $PSScriptRoot

$env:PORT = $Port
$env:HOST = $ServerHost

Write-Host ''
Write-Host "  Node: $node" -ForegroundColor DarkGray
Write-Host ''

& $node 'server/dev-server.js'
