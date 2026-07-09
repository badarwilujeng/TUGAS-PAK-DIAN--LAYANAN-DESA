import { useEffect, useState } from 'react';
import { pendudukAPI } from '../services/api';
import { Penduduk } from '../types';

const PendudukList = () => {
  const [penduduk, setPenduduk] = useState<Penduduk[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ nama: '', nik: '' });

  useEffect(() => {
    fetchPenduduk();
  }, []);

  const fetchPenduduk = async (params?: any) => {
    setLoading(true);
    try {
      const response = await pendudukAPI.getAll(params);
      if (response.data.success) {
        setPenduduk(response.data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch penduduk:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPenduduk(searchParams);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen Penduduk</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Tambah Penduduk
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6 bg-white p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Nama</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Cari nama..."
              value={searchParams.nama}
              onChange={(e) => setSearchParams({ ...searchParams, nama: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">NIK</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Cari NIK..."
              value={searchParams.nik}
              onChange={(e) => setSearchParams({ ...searchParams, nik: e.target.value })}
            />
          </div>
          <div className="flex items-end space-x-2">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1">
              Cari
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchParams({ nama: '', nik: '' });
                fetchPenduduk();
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-4 text-center">Loading...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dusun</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {penduduk.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data penduduk.
                  </td>
                </tr>
              ) : (
                penduduk.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.nik}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.nama}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{p.alamat}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.dusun}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Hapus</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PendudukList;
