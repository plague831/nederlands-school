@echo off
REM Запуск проєкту подвійним кліком або командою start.cmd
REM Обходить проблему застарілого PATH у терміналі.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start.ps1" %*
