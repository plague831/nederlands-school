# Запуск проєкту незалежно від PATH поточного терміналу.
#
# Потрібен, якщо термінал (або VS Code) стартував до встановлення Node.js
# і через це не бачить команди `node` та `npm`. Скрипт бере актуальний PATH
# безпосередньо з реєстру Windows, тому працює без перезавантаження.
#
# Запуск:  .\start.ps1               — сервер розробки Vite (гаряче перезавантаження)
#          .\start.ps1 -Port 8080    — інший порт
#          .\start.ps1 -Build        — зібрати проєкт і віддати готову статику

param(
    [int]$Port = 5173,
    [string]$ServerHost = '127.0.0.1',
    [switch]$Build
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
    Write-Host '  Встанови його з https://nodejs.org/ (версія 20 або новіша),'
    Write-Host '  або виконай:  winget install OpenJS.NodeJS.LTS'
    Write-Host ''
    exit 1
}

Set-Location $PSScriptRoot

# Залежності потрібні: проєкт збирається з вихідного коду.
if (-not (Test-Path 'node_modules')) {
    Write-Host ''
    Write-Host '  Залежності не встановлені. Встановлюю…' -ForegroundColor Yellow
    Write-Host ''
    $npm = Join-Path (Split-Path $node) 'npm.cmd'
    if (-not (Test-Path $npm)) { $npm = 'npm' }
    & $npm 'install'
    if ($LASTEXITCODE -ne 0) {
        Write-Host '  Не вдалося встановити залежності.' -ForegroundColor Red
        exit 1
    }
}

Write-Host ''
Write-Host "  Node: $node" -ForegroundColor DarkGray
Write-Host ''

if ($Build) {
    # Продакшн-збірка + локальна віддача статики так, як це зробить хостинг.
    & $node 'node_modules/vite/bin/vite.js' 'build'
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    $env:PORT = $Port
    $env:HOST = $ServerHost
    & $node 'server/dev-server.js'
} else {
    & $node 'node_modules/vite/bin/vite.js' '--host' $ServerHost '--port' $Port
}
