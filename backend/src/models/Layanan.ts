import { Penduduk } from './Penduduk';

export enum StatusLayanan {
  MENUNGGU = 'menunggu',
  DIPROSES = 'diproses',
  SELESAI = 'selesai',
  DITOLAK = 'ditolak',
}

export interface Layanan {
  id: number;
  penduduk_id: number;
  jenis_surat: 'Surat Keterangan' | 'Surat Kelahiran' | 'SKU' | 'Surat Pengantar';
  keperluan: string;
  status: StatusLayanan;
  catatan_admin?: string;
  created_at: Date;
  updated_at: Date;
  // Join with penduduk data
  penduduk?: Penduduk;
}

export interface CreateLayananInput {
  penduduk_id: number;
  jenis_surat: 'Surat Keterangan' | 'Surat Kelahiran' | 'SKU' | 'Surat Pengantar';
  keperluan: string;
}

export interface UpdateLayananInput {
  id: number;
  status?: StatusLayanan;
  catatan_admin?: string;
}

export interface LayananWithPenduduk extends Layanan {
  penduduk: Penduduk;
}
