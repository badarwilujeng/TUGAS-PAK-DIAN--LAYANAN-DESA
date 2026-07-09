import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { layananAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const LayananPengajuan = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState<any>({
    nama: user?.username || '',
    nik: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat: '',
    keperluan: '',
    keterangan: '',
    jenis_surat: '',
  });

  // Dynamic Service Data
  const serviceData: any = {
    'surat-pengantar': {
      title: 'Surat Pengantar',
      subtitle: 'Layanan surat pengantar untuk keperluan administrasi warga.',
      icon: 'file-text',
      color: 'green',
      fields: ['nama', 'nik', 'tempat_lahir', 'tanggal_lahir', 'alamat', 'keperluan'],
      syarat: ['1. Fotokopi KTP', '2. Fotokopi KK', '3. Dokumen pendukung (jika diperlukan)'],
    },
    'surat-keterangan': {
      title: 'Surat Keterangan',
      subtitle: 'Layanan surat keterangan untuk kebutuhan warga.',
      icon: 'file',
      color: 'blue',
      fields: ['nama', 'nik', 'tempat_lahir', 'tanggal_lahir', 'alamat', 'keperluan'],
      syarat: ['1. Fotokopi KTP', '2. Fotokopi KK', '3. Dokumen pendukung (jika diperlukan)'],
    },
    'permohonan-kk': {
      title: 'Permohonan Kartu Keluarga',
      subtitle: 'Ajukan permohonan pembuatan Kartu Keluarga baru.',
      icon: 'users',
      color: 'purple',
      fields: ['nama', 'nik', 'alamat', 'keterangan'],
      syarat: ['1. Fotokopi KTP Kepala Keluarga', '2. Fotokopi Akta Nikah', '3. Fotokopi Akta Kelahiran', '4. Surat keterangan domisili'],
    },
    'permohonan-ktp': {
      title: 'Permohonan KTP',
      subtitle: 'Ajukan permohonan pembuatan KTP Elektronik.',
      icon: 'credit-card',
      color: 'teal',
      fields: ['nama', 'nik', 'tempat_lahir', 'tanggal_lahir', 'alamat'],
      syarat: ['1. Fotokopi KK', '2. Fotokopi Akta Kelahiran', '3. Pas Foto 3x4', '4. Surat keterangan (jika diperlukan)'],
    },
    'permohonan-pindah': {
      title: 'Permohonan Pindah',
      subtitle: 'Ajukan permohonan pindah domisili keluar/masuk.',
      icon: 'truck',
      color: 'orange',
      fields: ['nama', 'nik', 'alamat', 'keperluan'],
      syarat: ['1. Fotokopi KTP', '2. Fotokopi KK', '3. Surat pengantar RT/RW', '4. Surat keterangan pindah (jika ada)'],
    },
    'layanan-lainnya': {
      title: 'Layanan Lainnya',
      subtitle: 'Layanan surat dan dokumen lainnya.',
      icon: 'more-horizontal',
      color: 'cyan',
      fields: ['nama', 'nik', 'keperluan', 'keterangan'],
      syarat: ['Surat Tidak Mampu', 'Surat Usaha', 'Surat Keterangan Ahli Waris', 'Surat Keterangan Domisili'],
    }
  };

  const service = serviceData[type || ''] || serviceData['surat-pengantar'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await layananAPI.create({
        ...formData,
        jenis_surat: formData.jenis_surat || service.title,
        keperluan: formData.keperluan || service.title
      });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard/layanan'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Gagal mengirim permohonan');
    } finally {
      setLoading(false);
    }
  };

  const Icon = ({ name }: { name: string }) => {
    switch (name) {
      case 'file-text': return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>;
      case 'file': return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>;
      case 'users': return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>;
      case 'credit-card': return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>;
      case 'truck': return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>;
      case 'more-horizontal': return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>;
      default: return null;
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Permohonan Berhasil Dikirim!</h2>
        <p className="text-gray-500 max-w-sm">Mohon tunggu, Anda akan diarahkan ke riwayat permohonan dalam beberapa detik.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
        <Link to="/dashboard" className="hover:text-green-600">Beranda</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6" /></svg>
        <span className="text-green-600">{service.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Main Form Area */}
        <div className="flex-1 space-y-10">
          <div className="flex items-center gap-8">
            <div className={`w-24 h-24 bg-white rounded-[32px] shadow-xl shadow-${service.color}-100 flex items-center justify-center text-${service.color}-600`}>
              <Icon name={service.icon} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{service.title}</h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-lg">{service.subtitle}</p>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
               Formulir {service.title}
               <div className="h-0.5 flex-1 bg-gray-50"></div>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {type === 'surat-pengantar' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
                      <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan nama lengkap" value={formData.nama} onChange={e => setFormData({ ...formData, nama: e.target.value })} required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">NIK</label>
                      <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan NIK" value={formData.nik} onChange={e => setFormData({ ...formData, nik: e.target.value })} required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">Tempat / Tanggal Lahir</label>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-sm font-medium`} placeholder="Tempat" value={formData.tempat_lahir} onChange={e => setFormData({ ...formData, tempat_lahir: e.target.value })} />
                        <input type="date" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-sm font-medium`} value={formData.tanggal_lahir} onChange={e => setFormData({ ...formData, tanggal_lahir: e.target.value })} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Alamat</label>
                    <textarea rows={3} className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan alamat lengkap" value={formData.alamat} onChange={e => setFormData({ ...formData, alamat: e.target.value })} required />
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Keperluan</label>
                    <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan keperluan surat pengantar" value={formData.keperluan} onChange={e => setFormData({ ...formData, keperluan: e.target.value })} />
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Tujuan / Instansi</label>
                    <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan tujuan / instansi" value={formData.keterangan} onChange={e => setFormData({ ...formData, keterangan: e.target.value })} />
                  </div>
                </>
              )}

              {type === 'surat-keterangan' && (
                <>
                  <div className="space-y-3 mb-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Jenis Surat Keterangan</label>
                    <select className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} value={formData.jenis_surat} onChange={e => setFormData({ ...formData, jenis_surat: e.target.value })} required>
                      <option value="">Pilih jenis surat keterangan</option>
                      <option value="Surat Keterangan Usaha">Surat Keterangan Usaha</option>
                      <option value="Surat Keterangan Tidak Mampu">Surat Keterangan Tidak Mampu</option>
                      <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
                      <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan nama lengkap" value={formData.nama} onChange={e => setFormData({ ...formData, nama: e.target.value })} required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">NIK</label>
                      <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan NIK" value={formData.nik} onChange={e => setFormData({ ...formData, nik: e.target.value })} required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">Tempat / Tanggal Lahir</label>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-sm font-medium`} placeholder="Tempat" value={formData.tempat_lahir} onChange={e => setFormData({ ...formData, tempat_lahir: e.target.value })} />
                        <input type="date" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-sm font-medium`} value={formData.tanggal_lahir} onChange={e => setFormData({ ...formData, tanggal_lahir: e.target.value })} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Alamat</label>
                    <textarea rows={3} className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan alamat lengkap" value={formData.alamat} onChange={e => setFormData({ ...formData, alamat: e.target.value })} required />
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Keperluan</label>
                    <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan keperluan surat keterangan" value={formData.keperluan} onChange={e => setFormData({ ...formData, keperluan: e.target.value })} />
                  </div>
                </>
              )}

              {type === 'permohonan-kk' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">Nama Kepala Keluarga</label>
                      <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan nama kepala keluarga" value={formData.nama} onChange={e => setFormData({ ...formData, nama: e.target.value })} required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">NIK Kepala Keluarga</label>
                      <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan NIK kepala keluarga" value={formData.nik} onChange={e => setFormData({ ...formData, nik: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Alamat</label>
                    <textarea rows={3} className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan alamat lengkap" value={formData.alamat} onChange={e => setFormData({ ...formData, alamat: e.target.value })} required />
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Alasan Permohonan</label>
                    <select className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} value={formData.keperluan} onChange={e => setFormData({ ...formData, keperluan: e.target.value })} required>
                      <option value="">Pilih alasan permohonan</option>
                      <option value="Membentuk Keluarga Baru">Membentuk Keluarga Baru</option>
                      <option value="Penggantian KK (Hilang/Rusak)">Penggantian KK (Hilang/Rusak)</option>
                      <option value="Perubahan Data">Perubahan Data</option>
                    </select>
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Jumlah Anggota Keluarga</label>
                    <input type="number" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan jumlah anggota keluarga" value={formData.keterangan} onChange={e => setFormData({ ...formData, keterangan: e.target.value })} />
                  </div>
                </>
              )}

              {type === 'permohonan-ktp' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
                      <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan nama lengkap" value={formData.nama} onChange={e => setFormData({ ...formData, nama: e.target.value })} required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">NIK</label>
                      <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan NIK" value={formData.nik} onChange={e => setFormData({ ...formData, nik: e.target.value })} required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">Tempat / Tanggal Lahir</label>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-sm font-medium`} placeholder="Tempat" value={formData.tempat_lahir} onChange={e => setFormData({ ...formData, tempat_lahir: e.target.value })} />
                        <input type="date" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-sm font-medium`} value={formData.tanggal_lahir} onChange={e => setFormData({ ...formData, tanggal_lahir: e.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">Jenis Kelamin</label>
                      <select className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} value={formData.keterangan} onChange={e => setFormData({ ...formData, keterangan: e.target.value })} required>
                        <option value="">Pilih jenis kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Alamat</label>
                    <textarea rows={3} className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan alamat lengkap" value={formData.alamat} onChange={e => setFormData({ ...formData, alamat: e.target.value })} required />
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Alasan Permohonan</label>
                    <select className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} value={formData.keperluan} onChange={e => setFormData({ ...formData, keperluan: e.target.value })} required>
                      <option value="">Pilih alasan permohonan</option>
                      <option value="Baru (Perekaman)">Baru (Perekaman)</option>
                      <option value="Hilang / Rusak">Hilang / Rusak</option>
                      <option value="Perubahan Data">Perubahan Data</option>
                    </select>
                  </div>
                </>
              )}

              {type === 'permohonan-pindah' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
                      <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan nama lengkap" value={formData.nama} onChange={e => setFormData({ ...formData, nama: e.target.value })} required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">NIK</label>
                      <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan NIK" value={formData.nik} onChange={e => setFormData({ ...formData, nik: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Alamat Asal</label>
                    <textarea rows={2} className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan alamat asal" value={formData.alamat} onChange={e => setFormData({ ...formData, alamat: e.target.value })} required />
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Alamat Tujuan</label>
                    <textarea rows={2} className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan alamat tujuan" value={formData.keterangan} onChange={e => setFormData({ ...formData, keterangan: e.target.value })} required />
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Alasan Pindah</label>
                    <select className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} value={formData.keperluan} onChange={e => setFormData({ ...formData, keperluan: e.target.value })} required>
                      <option value="">Pilih alasan pindah</option>
                      <option value="Pekerjaan">Pekerjaan</option>
                      <option value="Pendidikan">Pendidikan</option>
                      <option value="Keamanan">Keamanan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Tanggal Pindah</label>
                    <input type="date" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-sm font-medium`} value={formData.tanggal_lahir} onChange={e => setFormData({ ...formData, tanggal_lahir: e.target.value })} />
                  </div>
                </>
              )}

              {type === 'layanan-lainnya' && (
                <>
                  <div className="space-y-3 mb-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Jenis Layanan</label>
                    <select className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} value={formData.jenis_surat} onChange={e => setFormData({ ...formData, jenis_surat: e.target.value })} required>
                      <option value="">Pilih jenis layanan</option>
                      <option value="Surat Rekomendasi">Surat Rekomendasi</option>
                      <option value="Surat Kuasa">Surat Kuasa</option>
                      <option value="Layanan Khusus">Layanan Khusus</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
                      <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan nama lengkap" value={formData.nama} onChange={e => setFormData({ ...formData, nama: e.target.value })} required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">NIK</label>
                      <input type="text" className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Masukkan NIK" value={formData.nik} onChange={e => setFormData({ ...formData, nik: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-3 mt-8">
                    <label className="text-sm font-bold text-gray-700 ml-1">Keperluan</label>
                    <textarea rows={4} className={`w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-${service.color}-600 rounded-2xl outline-none transition-all text-gray-700 font-medium`} placeholder="Jelaskan keperluan Anda" value={formData.keperluan} onChange={e => setFormData({ ...formData, keperluan: e.target.value })} required />
                  </div>
                </>
              )}

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 ml-1">Lampiran (Opsional)</label>
                <div className="w-full px-6 py-8 border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center gap-3 bg-gray-50/30 hover:bg-white hover:border-green-600 transition-all cursor-pointer group">
                   <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 group-hover:text-green-600 transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                   </div>
                   <p className="text-sm font-bold text-gray-900">Pilih File atau seret ke sini</p>
                   <p className="text-xs text-gray-400">Maks. 2 MB (PDF, JPG, PNG)</p>
                </div>
              </div>

              {error && <p className="text-sm font-bold text-red-500">{error}</p>}

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full md:w-auto px-12 py-4 bg-${service.color}-600 hover:bg-${service.color}-700 text-white rounded-2xl font-bold shadow-lg shadow-${service.color}-100 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50`}
                >
                  {loading ? 'Mengirim...' : 'Ajukan Permohonan'}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="w-full lg:w-80 space-y-8">
           <div className="bg-[#EEF2FF] rounded-[40px] p-8 space-y-6">
              <h4 className="text-lg font-bold text-[#4338CA]">Syarat</h4>
              <div className="space-y-4">
                 {service.syarat.map((s: string, i: number) => (
                   <div key={i} className="flex gap-3 text-sm text-[#4338CA]/80 font-medium leading-relaxed">
                      <div className="w-1.5 h-1.5 bg-[#4338CA] rounded-full mt-2 flex-shrink-0"></div>
                      {s}
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-[#F0FDF4] rounded-[40px] p-8 space-y-6">
              <h4 className="text-lg font-bold text-green-700">Informasi</h4>
              <p className="text-sm text-green-700/70 font-medium leading-relaxed">
                 {service.type === 'layanan-lainnya' 
                   ? 'Pilih jenis layanan sesuai kebutuhan Anda. Pastikan data yang dimasukkan valid.'
                   : `Permohonan ${service.title} akan diproses maksimal 2x24 jam hari kerja setelah data diverifikasi.`}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LayananPengajuan;
