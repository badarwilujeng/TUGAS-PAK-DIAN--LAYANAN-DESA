# 🏡 Layanan Desa — Portal Administrasi Digital

Sistem informasi layanan administrasi desa berbasis web yang memungkinkan warga untuk mengajukan berbagai surat dan dokumen secara online.

---

## 🚀 Cara Menjalankan Website (Mudah)

### Langkah 1 — Pastikan XAMPP Aktif
1. Buka **XAMPP Control Panel**
2. Klik **Start** pada **Apache** dan **MySQL**
3. Pastikan keduanya berstatus **hijau/running**

### Langkah 2 — Jalankan dengan 1 Klik
Double-klik file: **`JALANKAN_WEBSITE.bat`**

✅ Browser akan terbuka otomatis ke `http://localhost:5173`

### Langkah 3 — Untuk Menghentikan Server
Double-klik file: **`STOP_SERVER.bat`**

---

## 🌐 Alamat Akses

| Layanan | URL |
|---|---|
| 🌐 Website (Frontend) | http://localhost:5173 |
| ⚙️ API Backend | http://localhost:3000/api |
| 🗄️ Database (phpMyAdmin) | http://localhost/phpmyadmin |

---

## 👥 Akun Default

| Role | Cara Akses |
|---|---|
| **Kepala Desa / Admin** | Daftar akun → role admin diset dari database |
| **Sekretaris** | Daftar akun → role sekretaris diset dari database |
| **Penduduk (Warga)** | Daftar akun langsung di halaman `/login` |

---

## 📋 Fitur Tersedia

### Untuk Warga (Penduduk)
- ✅ Daftar & Login akun
- ✅ Lupa kata sandi → ganti langsung dari halaman login
- ✅ Ajukan **Surat Pengantar**
- ✅ Ajukan **Surat Keterangan** (Usaha, Tidak Mampu, Domisili)
- ✅ Ajukan **Permohonan KK** (Kartu Keluarga)
- ✅ Ajukan **Permohonan KTP** (Elektronik)
- ✅ Ajukan **Permohonan Pindah**
- ✅ Layanan Lainnya (Rekomendasi, Kuasa, dll)
- ✅ Riwayat semua permohonan

### Untuk Admin (Sekretaris / Kepala Desa)
- ✅ Dashboard statistik
- ✅ Kelola data penduduk
- ✅ Proses permohonan warga (Proses / Selesai / Tolak)
- ✅ Cetak PDF surat yang sudah selesai
- ✅ Hapus permohonan

---

## 🗂️ Struktur Folder

```
TUGAS PAK DIAN, LAYANAN DESA/
├── JALANKAN_WEBSITE.bat    ← Klik ini untuk menjalankan
├── STOP_SERVER.bat         ← Klik ini untuk menghentikan
├── frontend/               ← Tampilan website (React + Vite)
│   └── src/
│       ├── pages/          ← Halaman-halaman website
│       ├── components/     ← Komponen UI
│       ├── context/        ← State management
│       └── services/       ← Koneksi ke API
└── backend/                ← Server API (Node.js + Express)
    ├── .env                ← Konfigurasi database & JWT
    └── src/
        ├── routes/         ← Endpoint API
        ├── controllers/    ← Logic API
        └── services/       ← Query database
```

---

## ⚙️ Konfigurasi Database

File konfigurasi: `backend/.env`

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=          ← Isi password MySQL jika ada
DB_NAME=sistem_desa   ← Nama database di phpMyAdmin
JWT_SECRET=your_secret_key_here
PORT=3000
```

> **Pastikan** database `sistem_desa` sudah dibuat di phpMyAdmin!

---

## 🆘 Troubleshooting

| Masalah | Solusi |
|---|---|
| Website tidak terbuka | Pastikan XAMPP MySQL sudah ON |
| "Cannot connect to database" | Cek konfigurasi di `backend/.env` |
| "Port 3000 in use" | Jalankan `STOP_SERVER.bat` lalu coba lagi |
| "Port 5173 in use" | Tutup terminal yang masih berjalan |
| Halaman error 404 | Refresh browser (Ctrl+F5) |

---

*© 2024 Layanan Desa — Tugas PAK DIAN*
