@echo off
title Layanan Desa - Starter
color 0A
cls

echo.
echo  ============================================
echo      LAYANAN DESA - LOCAL DEVELOPMENT
echo  ============================================
echo.

REM --- Cek apakah XAMPP/MySQL sedang berjalan ---
echo  [1/3] Memeriksa koneksi MySQL...
timeout /t 1 /nobreak >nul

REM --- Jalankan Backend ---
echo  [2/3] Menjalankan Backend API (port 3000)...
start "BACKEND - Layanan Desa" cmd /k "cd /d "%~dp0backend" && echo Backend starting... && npm run dev"

REM --- Tunggu backend siap ---
echo  [3/3] Menunggu backend siap (5 detik)...
timeout /t 5 /nobreak >nul

REM --- Jalankan Frontend ---
echo  Menjalankan Frontend (port 5173)...
start "FRONTEND - Layanan Desa" cmd /k "cd /d "%~dp0frontend" && echo Frontend starting... && npm run dev"

REM --- Tunggu frontend siap ---
timeout /t 4 /nobreak >nul

REM --- Buka Browser ---
echo  Membuka browser...
start "" "http://localhost:5173"

echo.
echo  ============================================
echo   Website siap! Buka: http://localhost:5173
echo   Backend API :       http://localhost:3000
echo.
echo   PENTING: Pastikan XAMPP MySQL sudah ON
echo  ============================================
echo.
echo  Tekan tombol apa saja untuk menutup jendela ini.
echo  (Server tetap berjalan di jendela lain)
pause >nul
