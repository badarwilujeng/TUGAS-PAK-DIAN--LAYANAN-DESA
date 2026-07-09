import { getDB } from '../config/database';
import { Layanan, CreateLayananInput, UpdateLayananInput, StatusLayanan, Penduduk, LayananWithPenduduk } from '../models';
import { generateLetterPDF } from '../utils/pdfGenerator';

export const layananService = {
  async create(data: CreateLayananInput): Promise<Layanan> {
    const [result] = await getDB().execute(
      'INSERT INTO layanan (penduduk_id, jenis_surat, keperluan, status, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [data.penduduk_id, data.jenis_surat, data.keperluan, StatusLayanan.MENUNGGU]
    );

    const [rows] = await getDB().execute('SELECT * FROM layanan WHERE id = ?', [(result as any).insertId]);
    return (rows as any[])[0] as Layanan;
  },

  async findAllByPendudukId(pendudukId: number): Promise<Layanan[]> {
    const [rows] = await getDB().execute('SELECT * FROM layanan WHERE penduduk_id = ? ORDER BY created_at DESC', [pendudukId]);
    return rows as Layanan[];
  },

  async findAll(): Promise<LayananWithPenduduk[]> {
    const [rows] = await getDB().execute(
      `SELECT l.*, p.nama as penduduk_nama, p.nik as penduduk_nik, p.alamat as penduduk_alamat 
       FROM layanan l 
       LEFT JOIN penduduk p ON l.penduduk_id = p.id 
       ORDER BY l.created_at DESC`
    );
    // Map to include penduduk object
    return (rows as any[]).map(row => ({
      ...row,
      penduduk: {
        id: row.penduduk_id,
        nama: row.penduduk_nama,
        nik: row.penduduk_nik,
        alamat: row.penduduk_alamat,
        // other penduduk fields are not needed in list
      } as Penduduk,
    }));
  },

  async findById(id: number): Promise<Layanan | null> {
    const [rows] = await getDB().execute(
      `SELECT l.*, p.nama as penduduk_nama, p.nik as penduduk_nik, p.alamat as penduduk_alamat, p.Tempat_TanggalLahir, p.jenis_kelamin, p.rt, p.rw, p.dusun, p.agama 
       FROM layanan l 
       LEFT JOIN penduduk p ON l.penduduk_id = p.id 
       WHERE l.id = ?`,
      [id]
    );
    const row = (rows as any[])[0];
    if (!row) return null;
    return {
      ...row,
      penduduk: {
        id: row.penduduk_id,
        nama: row.penduduk_nama,
        nik: row.penduduk_nik,
        alamat: row.penduduk_alamat,
        Tempat_TanggalLahir: row.Tempat_TanggalLahir,
        jenis_kelamin: row.jenis_kelamin,
        rt: row.rt,
        rw: row.rw,
        dusun: row.dusun,
        agama: row.agama,
      } as Penduduk,
    } as Layanan;
  },

  async updateStatus(id: number, status: StatusLayanan, catatan_admin?: string): Promise<Layanan | null> {
    const [result] = await getDB().execute(
      'UPDATE layanan SET status = ?, catatan_admin = ?, updated_at = NOW() WHERE id = ?',
      [status, catatan_admin || null, id]
    );

    if ((result as any).affectedRows === 0) {
      return null;
    }

    const [rows] = await getDB().execute('SELECT * FROM layanan WHERE id = ?', [id]);
    return (rows as any[])[0] as Layanan;
  },

  async delete(id: number): Promise<boolean> {
    const [result] = await getDB().execute('DELETE FROM layanan WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  },

  async getStatistics(): Promise<{ total: number; byStatus: Record<string, number> }> {
    const [totalRows] = await getDB().execute('SELECT COUNT(*) as count FROM layanan');
    const total = ((totalRows as any[])[0]).count;

    const [statusRows] = await getDB().execute(
      'SELECT status, COUNT(*) as count FROM layanan GROUP BY status'
    );
    const byStatus: Record<string, number> = {};
    (statusRows as any[]).forEach((row: any) => {
      byStatus[row.status] = row.count;
    });

    return { total, byStatus };
  },

  async generatePDF(layananId: number): Promise<Buffer> {
    const layanan = await this.findById(layananId);
    if (!layanan) {
      throw new Error('Layanan not found');
    }
    return generateLetterPDF(layanan);
  },
};
