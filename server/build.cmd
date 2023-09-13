@echo off
powershell write-host "building main.js..." -foreground cyan
@REM npx tsc main.ts && node . && powershell write-host "Duck has been disappeared..." -foreground cyan
node . 
powershell write-host "Duck has been disappeared..." -foreground cyan