@echo off
set "LAB_NODE=C:\Users\yasha\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
cd /d "%~dp0project"
"%LAB_NODE%" scripts\serve.mjs
pause
