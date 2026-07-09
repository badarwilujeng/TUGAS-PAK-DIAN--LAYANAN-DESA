import { getDB } from '../config/database';

export const dashboardService = {
  async getStatistics() {
    // Total penduduk
    const [pendudukRows] = await getDB().execute('SELECT COUNT(*) as total FROM penduduk');
    const totalPenduduk = ((pendudukRows as any[])[0]).total;

    // Layanan statistics
    const [layananRows] = await getDB().execute('SELECT COUNT(*) as total FROM layanan');
    const totalLayanan = ((layananRows as any[])[0]).total;

    const [statusRows] = await getDB().execute(
      'SELECT status, COUNT(*) as count FROM layanan GROUP BY status'
    );
    const layananByStatus: Record<string, number> = {};
    (statusRows as any[]).forEach((row: any) => {
      layananByStatus[row.status] = row.count;
    });

    // Recent layanan (last 5)
    const [recentRows] = await getDB().execute(
      `SELECT l.*, p.nama as penduduk_nama 
       FROM layanan l 
       LEFT JOIN penduduk p ON l.penduduk_id = p.id 
       ORDER BY l.created_at DESC 
       LIMIT 5`
    );

    return {
      totalPenduduk,
      totalLayanan,
      layananByStatus,
      recentLayanan: recentRows,
    };
  },
};
