import { useEffect, useState } from 'react';
import { dashboardAPI } from '../services/api';
import { DashboardStats } from '../types';

const Dashboard = () => {
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

  const statusColors: Record<string, string> = {
    menunggu: 'bg-yellow-100 text-yellow-600',
    diproses: 'bg-blue-100 text-blue-600',
    selesai: 'bg-green-100 text-green-600',
    ditolak: 'bg-red-100 text-red-600',
  };

  const statusLabels: Record<string, string> = {
    menunggu: 'Menunggu',
    diproses: 'Diproses',
    selesai: 'Selesai',
    ditolak: 'Ditolak',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Selamat datang kembali di portal administrasi desa.</p>
        </div>
      </div>

      {stats && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Penduduk', value: stats.totalPenduduk, color: 'blue' },
              { label: 'Total Permohonan', value: stats.totalLayanan, color: 'green' },
              { label: 'Permohonan Baru', value: stats.recentLayanan.length, color: 'orange' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{stat.label}</p>
                <p className={`text-4xl font-bold text-${stat.color}-600`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Status Chart-like area */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Status Permohonan</h3>
              <div className="space-y-4">
                {Object.entries(stats.layananByStatus).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase ${statusColors[status]}`}>
                      {statusLabels[status] || status}
                    </span>
                    <span className="text-lg font-bold text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Permohonan Terbaru</h3>
              <div className="space-y-4">
                {stats.recentLayanan.length === 0 ? (
                  <p className="text-gray-500 italic text-center py-8">Belum ada aktivitas terbaru.</p>
                ) : (
                  stats.recentLayanan.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-2xl transition-all group">
                      <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 font-bold group-hover:scale-110 transition-transform">
                          {item.jenis_surat[0]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{item.jenis_surat}</p>
                          <p className="text-xs text-gray-400">
                            {item.penduduk_nama || 'Umum'} • {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${statusColors[item.status]}`}>
                        {statusLabels[item.status]}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
