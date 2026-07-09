@echo off
title Layanan Desa - STOP ALL
color 0C
cls

echo.
echo  ============================================
echo      MENGHENTIKAN SEMUA SERVER
echo  ============================================
echo.
echo  Menutup semua proses Node.js...
taskkill /F /IM node.exe /T >nul 2>&1
echo  Semua server telah dihentikan!
echo.
echo  Tekan tombol apa saja untuk keluar.
pause >nul
