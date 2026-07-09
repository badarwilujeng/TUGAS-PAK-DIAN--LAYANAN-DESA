import { useEffect, useState } from 'react';
import { pendudukAPI } from '../services/api';
import { Penduduk } from '../types';

const Profile = () => {
  const [penduduk, setPenduduk] = useState<Penduduk | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await pendudukAPI.getMe();
      if (response.data.success) {
        setPenduduk(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!penduduk) {
    return <div className="text-center py-10">Data profil tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profil Saya</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Data Pribadi</h3>
            <p className="mt-2"><span className="font-medium">NIK:</span> {penduduk.nik}</p>
            <p><span className="font-medium">Nama:</span> {penduduk.nama}</p>
            <p><span className="font-medium">Tempat/Tanggal Lahir:</span> {penduduk.Tempat_TanggalLahir}</p>
            <p><span className="font-medium">Jenis Kelamin:</span> {penduduk.jenis_kelamin}</p>
            <p><span className="font-medium">Agama:</span> {penduduk.agama}</p>
            <p><span className="font-medium">Pendidikan:</span> {penduduk.pendidikan}</p>
            <p><span className="font-medium">Pekerjaan:</span> {penduduk.pekerjaan}</p>
            <p><span className="font-medium">Status Kawin:</span> {penduduk.status_kawin}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Alamat & Keluarga</h3>
            <p className="mt-2"><span className="font-medium">Alamat:</span> {penduduk.alamat}</p>
            <p><span className="font-medium">RT/RW:</span> {penduduk.rt}/{penduduk.rw}</p>
            <p><span className="font-medium">Dusun:</span> {penduduk.dusun}</p>
            <p><span className="font-medium">Hubungan Keluarga:</span> {penduduk.hubungan_keluarga}</p>
            <p><span className="font-medium">Kewarganegaraan:</span> {penduduk.kewarganegaraan}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
