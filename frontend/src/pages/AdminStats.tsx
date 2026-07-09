import { useEffect, useState } from 'react';
import { dashboardAPI } from '../services/api';
import { DashboardStats } from '../types';

const AdminStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getStats();
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Statistik Sistem</h1>

      {/* Totals */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Total Penduduk</p>
          <p className="text-4xl font-bold text-blue-600">{stats?.totalPenduduk}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Total Permohonan</p>
          <p className="text-4xl font-bold text-green-600">{stats?.totalLayanan}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Menunggu</p>
          <p className="text-4xl font-bold text-yellow-600">{stats?.layananByStatus.menunggu || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Selesai</p>
          <p className="text-4xl font-bold text-green-600">{stats?.layananByStatus.selesai || 0}</p>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Permohonan Terbaru</h2>
        {stats && stats.recentLayanan.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jenis Surat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pemohon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.recentLayanan.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm">{item.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{item.jenis_surat}</td>
                  <td className="px-6 py-4 text-sm">{item.penduduk_nama}</td>
                  <td className="px-6 py-4 text-sm">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.status === 'menunggu' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'diproses' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'selesai' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Tidak ada data.</p>
        )}
      </div>
    </div>
  );
};

export default AdminStats;
