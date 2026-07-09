-- Database: sistem_desa

-- Create penduduk table
CREATE TABLE IF NOT EXISTS penduduk (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nik VARCHAR(16) UNIQUE NOT NULL,
  nama VARCHAR(100) NOT NULL,
  Tempat_TanggalLahir VARCHAR(100) NOT NULL,
  jenis_kelamin ENUM('Laki-laki', 'Perempuan') NOT NULL,
  alamat TEXT NOT NULL,
  rt VARCHAR(5) NOT NULL,
  rw VARCHAR(5) NOT NULL,
  dusun VARCHAR(50) NOT NULL,
  agama VARCHAR(20) NOT NULL,
  pendidikan VARCHAR(50),
  pekerjaan VARCHAR(50),
  status_kawin ENUM('Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati') NOT NULL DEFAULT 'Belum Kawin',
  hubungan_keluarga VARCHAR(50) NOT NULL,
  kewarganegaraan VARCHAR(10) NOT NULL DEFAULT 'WNI',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('penduduk', 'sekretaris', 'kapala_desa') NOT NULL DEFAULT 'penduduk',
  penduduk_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (penduduk_id) REFERENCES penduduk(id) ON DELETE SET NULL
);

-- Create layanan table
CREATE TABLE IF NOT EXISTS layanan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  penduduk_id INT NOT NULL,
  jenis_surat ENUM('Surat Keterangan', 'Surat Kelahiran', 'SKU', 'Surat Pengantar') NOT NULL,
  keperluan TEXT NOT NULL,
  status ENUM('menunggu', 'diproses', 'selesai', 'ditolak') NOT NULL DEFAULT 'menunggu',
  catatan_admin TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (penduduk_id) REFERENCES penduduk(id) ON DELETE CASCADE
);

-- Insert sample penduduk data
INSERT INTO penduduk (nik, nama, Tempat_TanggalLahir, jenis_kelamin, alamat, rt, rw, dusun, agama, pendidikan, pekerjaan, status_kawin, hubungan_keluarga, kewarganegaraan) VALUES
('1234567890123456', 'Ahmad Fauzi', 'Bandung, 15-01-1990', 'Laki-laki', 'Dusun Mekar Jaya, RT 003/RW 002', '003', '002', 'Mekar Jaya', 'Islam', 'S1', 'PNS', 'Kawin', 'Kepala Keluarga', 'WNI'),
('2345678901234567', 'Siti Aminah', 'Jakarta, 20-05-1985', 'Perempuan', 'Dusun Sumber Rejeki, RT 002/RW 001', '002', '001', 'Sumber Rejeki', 'Islam', 'S1', 'Guru', 'Kawin', 'Ibu', 'WNI'),
('3456789012345678', 'Budi Santoso', 'Bekasi, 10-11-1995', 'Laki-laki', 'Dusun Taman Makmur, RT 001/RW 003', '001', '003', 'Taman Makmur', 'Islam', 'SMA', 'Karyawan Swasta', 'Belum Kawin', 'Anak', 'WNI'),
('4567890123456789', 'Dewi Kusuma', 'Surabaya, 05-07-1992', 'Perempuan', 'Dusun Mekar Jaya, RT 003/RW 002', '003', '002', 'Mekar Jaya', 'Islam', 'S1', 'Wiraswasta', 'Kawin', 'Ibu', 'WNI'),
('5678901234567890', 'Eko Prasetyo', 'Malang, 12-03-1988', 'Laki-laki', 'Dusun Sumber Rejeki, RT 002/RW 001', '002', '001', 'Sumber Rejeki', 'Kristen', 'S2', 'Dokter', 'Kawin', 'Kepala Keluarga', 'WNI');

-- Insert admin users (sekretaris and kapala_desa)
-- Password for all: 'password123' hashed with bcrypt (will need to be hashed in actual use)
-- For now, we'll insert placeholder; in production, passwords must be hashed.
-- You can use the application's register endpoint to create users with hashed passwords.

-- Insert a sekretaris user (no linked penduduk)
INSERT INTO users (username, password, role, penduduk_id) VALUES
('sekretaris', '$2b$10$ExampleHashForNow', 'sekretaris', NULL);

-- Insert a kapala_desa user (linked to penduduk Ahmad Fauzi)
INSERT INTO users (username, password, role, penduduk_id) VALUES
('kapala', '$2b$10$ExampleHashForNow', 'kapala_desa', 1);

-- Insert a penduduk user (linked to Siti Aminah)
INSERT INTO users (username, password, role, penduduk_id) VALUES
('siti', '$2b$10$ExampleHashForNow', 'penduduk', 2);

-- Note: The passwords above are placeholders. They need to be replaced with actual bcrypt hashes.
-- You should either:
-- 1. Use the registration API endpoint to create users (which hashes passwords)
-- 2. Or manually generate bcrypt hash and update these records.

-- Insert sample layanan data
INSERT INTO layanan (penduduk_id, jenis_surat, keperluan, status) VALUES
(2, 'Surat Keterangan', 'Keperluan Untuk Pengurusan BPJS', 'menunggu'),
(3, 'Surat Pengantar', 'Pengurusan KTP', 'diproses'),
(1, 'SKU', 'Usaha Dagangan', 'selesai');
