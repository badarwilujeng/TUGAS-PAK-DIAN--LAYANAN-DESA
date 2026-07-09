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
  created_at: Date;
  updated_at: Date;
}

export interface CreatePendudukInput {
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
}

export interface UpdatePendudukInput extends CreatePendudukInput {
  id: number;
}

export interface PendudukSearchOptions {
  nama?: string;
  nik?: string;
  dusun?: string;
  rt?: string;
  rw?: string;
}
