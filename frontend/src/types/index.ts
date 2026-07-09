export interface User {
  id: number;
  username: string;
  role: 'penduduk' | 'sekretaris' | 'kapala_desa';
  penduduk_id?: number;
}

export interface Penduduk {
  id: number;
  nik: string;
  nama: string;
  Tempat_TanggalLahir: string;
  jenis_kelamin: 'Laki-laki' | 'Perempuan';
  alamat: string;
  rt: string;
  rw: string;
  dusun: string;
  agama: string;
  pendidikan: string;
  pekerjaan: string;
  status_kawin: 'Belum Kawin' | 'Kawin' | 'Cerai Hidup' | 'Cerai Mati';
  hubungan_keluarga: string;
  kewarganegaraan: string;
  created_at: string;
  updated_at: string;
}

export interface Layanan {
  id: number;
  penduduk_id: number;
  jenis_surat: 'Surat Keterangan' | 'Surat Kelahiran' | 'SKU' | 'Surat Pengantar';
  keperluan: string;
  status: 'menunggu' | 'diproses' | 'selesai' | 'ditolak';
  catatan_admin?: string;
  created_at: string;
  updated_at: string;
  penduduk?: Penduduk;
}

export interface DashboardStats {
  totalPenduduk: number;
  totalLayanan: number;
  layananByStatus: Record<string, number>;
  recentLayanan: Layanan[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
