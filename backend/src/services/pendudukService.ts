import { getDB } from '../config/database';
import { Penduduk, CreatePendudukInput, UpdatePendudukInput, PendudukSearchOptions } from '../models';

export const pendudukService = {
  async create(data: CreatePendudukInput): Promise<Penduduk> {
    const [result] = await getDB().execute(
      `INSERT INTO penduduk 
        (nik, nama, Tempat_TanggalLahir, jenis_kelamin, alamat, rt, rw, dusun, agama, pendidikan, pekerjaan, status_kawin, hubungan_keluarga, kewarganegaraan, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        data.nik,
        data.nama,
        data.Tempat_TanggalLahir,
        data.jenis_kelamin,
        data.alamat,
        data.rt,
        data.rw,
        data.dusun,
        data.agama,
        data.pendidikan,
        data.pekerjaan,
        data.status_kawin,
        data.hubungan_keluarga,
        data.kewarganegaraan,
      ]
    );

    const [rows] = await getDB().execute('SELECT * FROM penduduk WHERE id = ?', [(result as any).insertId]);
    return (rows as any[])[0] as Penduduk;
  },

  async findAll(options?: PendudukSearchOptions): Promise<Penduduk[]> {
    let query = 'SELECT * FROM penduduk WHERE 1=1';
    const params: any[] = [];

    if (options?.nama) {
      query += ' AND nama LIKE ?';
      params.push(`%${options.nama}%`);
    }
    if (options?.nik) {
      query += ' AND nik = ?';
      params.push(options.nik);
    }
    if (options?.dusun) {
      query += ' AND dusun = ?';
      params.push(options.dusun);
    }
    if (options?.rt) {
      query += ' AND rt = ?';
      params.push(options.rt);
    }
    if (options?.rw) {
      query += ' AND rw = ?';
      params.push(options.rw);
    }

    query += ' ORDER BY nama ASC';

    const [rows] = await getDB().execute(query, params);
    return rows as Penduduk[];
  },

  async findById(id: number): Promise<Penduduk | null> {
    const [rows] = await getDB().execute('SELECT * FROM penduduk WHERE id = ?', [id]);
    return ((rows as any[])[0] as Penduduk) || null;
  },

  async update(id: number, data: UpdatePendudukInput): Promise<Penduduk | null> {
    const [result] = await getDB().execute(
      `UPDATE penduduk SET 
        nik = ?, nama = ?, Tempat_TanggalLahir = ?, jenis_kelamin = ?, alamat = ?, 
        rt = ?, rw = ?, dusun = ?, agama = ?, pendidikan = ?, 
        pekerjaan = ?, status_kawin = ?, hubungan_keluarga = ?, kewarganegaraan = ?, updated_at = NOW() 
       WHERE id = ?`,
      [
        data.nik,
        data.nama,
        data.Tempat_TanggalLahir,
        data.jenis_kelamin,
        data.alamat,
        data.rt,
        data.rw,
        data.dusun,
        data.agama,
        data.pendidikan,
        data.pekerjaan,
        data.status_kawin,
        data.hubungan_keluarga,
        data.kewarganegaraan,
        id,
      ]
    );

    if ((result as any).affectedRows === 0) {
      return null;
    }

    const [rows] = await getDB().execute('SELECT * FROM penduduk WHERE id = ?', [id]);
    return (rows as any[])[0] as Penduduk;
  },

  async delete(id: number): Promise<boolean> {
    const [result] = await getDB().execute('DELETE FROM penduduk WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  },

  async countTotal(): Promise<number> {
    const [rows] = await getDB().execute('SELECT COUNT(*) as count FROM penduduk');
    return ((rows as any[])[0]).count;
  },
};
