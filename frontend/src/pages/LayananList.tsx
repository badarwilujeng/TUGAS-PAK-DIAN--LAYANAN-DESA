import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { layananAPI } from '../services/api';
import { Layanan } from '../types';
import { useAuth } from '../context/AuthContext';

const services = [
  {
    title: 'Surat Pengantar',
    desc: 'Buat surat pengantar berbagai keperluan administrasi',
    icon: 'file-text',
    color: 'green',
    path: '/dashboard/layanan/pengajuan/surat-pengantar',
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-100',
    shadow: 'shadow-green-100',
  },
  {
    title: 'Surat Keterangan',
    desc: 'Permohonan surat keterangan desa untuk berbagai keperluan',
    icon: 'file',
    color: 'blue',
    path: '/dashboard/layanan/pengajuan/surat-keterangan',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-100',
    shadow: 'shadow-blue-100',
  },
  {
    title: 'Permohonan KK',
    desc: 'Permohonan kartu keluarga baru atau penggantian',
    icon: 'users',
    color: 'purple',
    path: '/dashboard/layanan/pengajuan/permohonan-kk',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-100',
    shadow: 'shadow-purple-100',
  },
  {
    title: 'Permohonan KTP',
    desc: 'Permohonan e-KTP baru atau penggantian data',
    icon: 'credit-card',
    color: 'teal',
    path: '/dashboard/layanan/pengajuan/permohonan-ktp',
    bg: 'bg-teal-50',
    text: 'text-teal-600',
    border: 'border-teal-100',
    shadow: 'shadow-teal-100',
  },
  {
    title: 'Permohonan Pindah',
    desc: 'Surat keterangan pindah domisili keluar/masuk desa',
    icon: 'truck',
    color: 'orange',
    path: '/dashboard/layanan/pengajuan/permohonan-pindah',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-100',
    shadow: 'shadow-orange-100',
  },
  {
    title: 'Layanan Lainnya',
    desc: 'Layanan administrasi dan surat lainnya',
    icon: 'more',
    color: 'cyan',
    path: '/dashboard/layanan/pengajuan/layanan-lainnya',
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    border: 'border-cyan-100',
    shadow: 'shadow-cyan-100',
  },
];

const ServiceIcon = ({ name, size = 28 }: { name: string; size?: number }) => {
  const s = size;
  switch (name) {
    case 'file-text': return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
    case 'file': return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>;
    case 'users': return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
    case 'credit-card': return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
    case 'truck': return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
    default: return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>;
  }
};

const LayananList = () => {
  const { user } = useAuth();
  const [layanan, setLayanan] = useState<Layanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'layanan' | 'riwayat'>('layanan');

  useEffect(() => {
    fetchLayanan();
  }, []);

  const fetchLayanan = async () => {
    setLoading(true);
    try {
      const response = await layananAPI.getAll();
      if (response.data.success) {
        setLayanan(response.data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch layanan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await layananAPI.update(id, { status });
      fetchLayanan();
    } catch (error) {
      alert('Gagal memperbarui status');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Hapus permohonan ini?')) return;
    try {
      await layananAPI.delete(id);
      fetchLayanan();
    } catch (error) {
      alert('Gagal menghapus');
    }
  };

  const handleGeneratePDF = async (id: number) => {
    try {
      const response = await layananAPI.generatePDF(id);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `surat_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Gagal mengunduh PDF');
    }
  };

  const statusColors: Record<string, string> = {
    menunggu: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    diproses: 'bg-blue-100 text-blue-700 border border-blue-200',
    selesai: 'bg-green-100 text-green-700 border border-green-200',
    ditolak: 'bg-red-100 text-red-700 border border-red-200',
  };

  const statusLabels: Record<string, string> = {
    menunggu: '🕐 Menunggu',
    diproses: '⚙️ Diproses',
    selesai: '✅ Selesai',
    ditolak: '❌ Ditolak',
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {user?.role === 'penduduk' ? 'Layanan Surat' : 'Manajemen Layanan'}
        </h1>
        <p className="text-gray-500 mt-1">
          {user?.role === 'penduduk'
            ? 'Ajukan permohonan surat dan dokumen dengan mudah'
            : 'Kelola semua permohonan layanan warga'}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl w-fit">
        <button
          onClick={() => setTab('layanan')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'layanan' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          📋 Jenis Layanan
        </button>
        <button
          onClick={() => setTab('riwayat')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'riwayat' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          📂 Riwayat Permohonan
          {layanan.length > 0 && (
            <span className="ml-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">{layanan.length}</span>
          )}
        </button>
      </div>

      {/* Service Cards Tab */}
      {tab === 'layanan' && (
        <div className="space-y-6">
          <p className="text-sm text-gray-500 font-medium">Pilih jenis layanan yang Anda butuhkan:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Link
                key={i}
                to={svc.path}
                className={`group bg-white rounded-3xl p-7 border-2 ${svc.border} hover:border-${svc.color}-400 shadow-sm hover:shadow-xl hover:shadow-${svc.color}-50 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-5`}
              >
                <div className={`w-14 h-14 ${svc.bg} rounded-2xl flex items-center justify-center ${svc.text} group-hover:scale-110 transition-transform duration-300`}>
                  <ServiceIcon name={svc.icon} size={26} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-gray-900 text-lg mb-1.5 group-hover:${svc.text} transition-colors`}>{svc.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{svc.desc}</p>
                </div>
                <div className={`flex items-center gap-2 ${svc.text} font-bold text-sm`}>
                  Ajukan Sekarang
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* History Tab */}
      {tab === 'riwayat' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 font-medium">
              {user?.role === 'penduduk' ? 'Daftar permohonan Anda:' : 'Semua permohonan warga:'}
            </p>
            {user?.role === 'penduduk' && (
              <Link
                to="/dashboard/layanan/pengajuan/surat-pengantar"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-lg shadow-green-100 flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Ajukan Baru
              </Link>
            )}
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Memuat data...</p>
            </div>
          ) : layanan.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <h3 className="font-bold text-gray-700 text-lg mb-1">Belum Ada Permohonan</h3>
              <p className="text-gray-400 text-sm mb-6">Mulai dengan mengajukan permohonan surat baru.</p>
              <Link
                to="/dashboard/layanan/pengajuan/surat-pengantar"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all inline-block"
              >
                Ajukan Sekarang
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {layanan.map((l, index) => (
                <div key={l.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900">{l.jenis_surat}</h4>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusColors[l.status] || 'bg-gray-100 text-gray-600'}`}>
                        {statusLabels[l.status] || l.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{l.keperluan}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                      <span>#{index + 1} · {l.penduduk?.nama || 'N/A'}</span>
                      <span>{new Date(l.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 flex-shrink-0">
                    {user?.role !== 'penduduk' && l.status !== 'selesai' && l.status !== 'ditolak' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(l.id, 'diproses')}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-all"
                        >
                          Proses
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(l.id, 'selesai')}
                          className="px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-xs font-bold transition-all"
                        >
                          Selesai
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(l.id, 'ditolak')}
                          className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold transition-all"
                        >
                          Tolak
                        </button>
                      </>
                    )}
                    {user?.role !== 'penduduk' && (
                      <button
                        onClick={() => handleDelete(l.id)}
                        className="px-3 py-1.5 bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg text-xs font-bold transition-all"
                      >
                        Hapus
                      </button>
                    )}
                    {l.status === 'selesai' && (
                      <button
                        onClick={() => handleGeneratePDF(l.id)}
                        className="px-3 py-1.5 bg-green-600 text-white hover:bg-green-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                        Cetak PDF
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LayananList;
