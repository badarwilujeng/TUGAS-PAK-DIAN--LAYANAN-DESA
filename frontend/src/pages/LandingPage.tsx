import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleServiceClick = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      navigate('/login', { state: { from: { pathname: path } } });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">Desaku</h1>
                <p className="text-xs text-gray-500">Layanan Desa dalam Genggaman</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-green-600 font-semibold border-b-2 border-green-600 pb-1">Beranda</a>
              <a href="#layanan" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Profil Desa</a>
              <a href="#layanan" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Layanan</a>
              <a href="#informasi" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Informasi</a>
              <a href="#informasi" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Potensi Desa</a>
              <a href="#informasi" className="text-gray-600 hover:text-green-600 font-medium transition-colors">PPID</a>
              <a href="#kontak" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Kontak</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              </button>
              {user ? (
                <Link 
                  to="/dashboard" 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-green-200 transition-all active:scale-95 flex items-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                  Dashboard
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-green-200 transition-all active:scale-95 flex items-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13.8 12H3" /></svg>
                  Masuk
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/images/hero_bg.png" 
            alt="Village View" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6 animate-fade-in-up">
            <p className="text-lg font-medium text-green-400">Selamat Datang di</p>
            <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
              Desaku
            </h2>
            <p className="text-lg text-gray-200 max-w-lg leading-relaxed">
              Desa yang maju, mandiri, sejahtera dan berdaya saing berlandaskan gotong royong dan kearifan lokal.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#layanan" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all transform hover:-translate-y-1 shadow-xl shadow-green-900/20">
                Jelajahi Layanan
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <a href="#layanan" className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all transform hover:-translate-y-1">
                Profil Desa
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/95 backdrop-blur-lg rounded-[32px] p-8 shadow-2xl space-y-6 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Pengumuman Terbaru</h3>
                <button className="text-green-600 text-sm font-bold hover:underline">Lihat Semua</button>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: "Musyawarah Desa Bahas RKPDes 2024", date: "20 Mei 2024", icon: "megaphone" },
                  { title: "Pendaftaran Bantuan Langsung Tunai (BLT) 2024", date: "18 Mei 2024", icon: "users" },
                  { title: "Jadwal Posyandu Bulan Mei 2024", date: "15 Mei 2024", icon: "calendar" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-green-50 transition-colors group cursor-pointer border border-gray-100 hover:border-green-200">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                      {item.icon === 'megaphone' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>}
                      {item.icon === 'users' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>}
                      {item.icon === 'calendar' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 group-hover:text-green-600 transition-colors"><path d="M9 18l6-6-6-6" /></svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Desa Section */}
      <section id="layanan" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">Layanan Desa</h2>
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                Akses berbagai layanan desa dengan mudah, cepat dan transparan melalui portal digital kami.
              </p>
            </div>
            <Link to="/dashboard/layanan" className="bg-white border-2 border-green-600 text-green-600 px-8 py-3 rounded-2xl font-bold hover:bg-green-600 hover:text-white transition-all flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
              Lihat Semua Layanan
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { title: "Surat Pengantar", desc: "Buat surat pengantar berbagai keperluan", icon: "file-text", color: "green", path: "/dashboard/layanan/pengajuan/surat-pengantar" },
              { title: "Surat Keterangan", desc: "Permohonan surat keterangan desa", icon: "file", color: "blue", path: "/dashboard/layanan/pengajuan/surat-keterangan" },
              { title: "Permohonan KK", desc: "Permohonan kartu keluarga baru", icon: "user", color: "orange", path: "/dashboard/layanan/pengajuan/permohonan-kk" },
              { title: "Permohonan KTP", desc: "Permohonan e-KTP baru / pindah", icon: "credit-card", color: "purple", path: "/dashboard/layanan/pengajuan/permohonan-ktp" },
              { title: "Permohonan Pindah", desc: "Surat keterangan pindah domisili", icon: "home", color: "red", path: "/dashboard/layanan/pengajuan/permohonan-pindah" },
              { title: "Layanan Lainnya", desc: "Layanan administrasi lainnya", icon: "check-circle", color: "teal", path: "/dashboard/layanan/pengajuan/layanan-lainnya" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2 flex flex-col items-center text-center cursor-pointer" onClick={() => handleServiceClick(item.path)}>
                <div className={`w-16 h-16 rounded-2xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                   {/* Simplified Icons based on type */}
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                   </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">{item.desc}</p>
                <button className="mt-auto w-10 h-10 bg-gray-50 group-hover:bg-green-600 rounded-full flex items-center justify-center text-gray-400 group-hover:text-white transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Grid: Berita, Agenda, Statistik */}
      <section id="informasi" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Berita Desa */}
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">Berita Desa</h3>
                <button className="text-green-600 text-sm font-bold hover:underline">Lihat Semua</button>
              </div>
              <div className="space-y-6">
                {[
                  { title: "Gotong Royong Bersihkan Lingkungan Desa", date: "20 Mei 2024", img: "news-1" },
                  { title: "Pelatihan UMKM untuk Warga Desa", date: "18 Mei 2024", img: "news-2" },
                  { title: "Pembangunan Jalan Desa Tahap 2 Dimulai", date: "15 Mei 2024", img: "news-3" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gray-200 group-hover:scale-110 transition-transform duration-500"></div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">{item.title}</h4>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 text-green-600 font-bold hover:gap-4 transition-all">
                Semua Berita <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Agenda Desa */}
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">Agenda Desa</h3>
                <button className="text-green-600 text-sm font-bold hover:underline">Lihat Semua</button>
              </div>
              <div className="space-y-6">
                {[
                  { title: "Gotong Royong Bersih Desa", day: "25", month: "MEI", time: "Sabtu, 25 Mei 2024 - 07.00 WIB", loc: "Balai Desa Desaku" },
                  { title: "Posyandu Balita & Lansia", day: "28", month: "MEI", time: "Selasa, 28 Mei 2024 - 08.00 WIB", loc: "Posyandu Melati" },
                  { title: "Musyawarah Desa (Musdes)", day: "02", month: "JUN", time: "Minggu, 2 Juni 2024 - 09.00 WIB", loc: "Balai Desa Desaku" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group cursor-pointer">
                    <div className="flex flex-col items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl group-hover:bg-green-600 transition-colors">
                      <span className="text-2xl font-bold text-gray-900 group-hover:text-white">{item.day}</span>
                      <span className="text-xs font-bold text-gray-500 group-hover:text-green-100">{item.month}</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">{item.title}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        {item.time}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        {item.loc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 text-green-600 font-bold hover:gap-4 transition-all">
                Semua Agenda <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Statistik Desa */}
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">Statistik Desa</h3>
                <button className="text-green-600 text-sm font-bold hover:underline">Lihat Detail</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Jumlah Penduduk", value: "2.451", icon: "users", color: "green" },
                  { label: "Jumlah KK", value: "823", icon: "home", color: "blue" },
                  { label: "Laki-laki", value: "1.234", icon: "user", color: "orange" },
                  { label: "Perempuan", value: "1.217", icon: "user", color: "pink" },
                  { label: "Luas Wilayah", value: "1.250 Ha", icon: "map", color: "purple" },
                  { label: "Dusun", value: "8", icon: "map-pin", color: "teal" }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-all group">
                    <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-green-600 group-hover:text-white transition-colors`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {item.icon === 'users' && <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />}
                        {item.icon === 'home' && <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />}
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                      <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Promo Banner */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-600 rounded-[40px] p-12 overflow-hidden relative group">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center text-white">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                   </div>
                   <h3 className="text-3xl font-bold">Layanan Desa dalam Genggaman</h3>
                </div>
                <p className="text-xl text-green-50 leading-relaxed">
                  Akses layanan dan informasi desa kapan saja, di mana saja melalui smartphone Anda.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-3 border border-gray-800 hover:bg-gray-900 transition-colors">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
                  </button>
                  <button className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-3 border border-gray-800 hover:bg-gray-900 transition-colors">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" alt="App Store" className="h-10" />
                  </button>
                </div>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                 <div className="w-[300px] h-[600px] bg-white rounded-[48px] p-4 shadow-2xl relative z-10 transform rotate-6 group-hover:rotate-0 transition-transform duration-500">
                    <div className="w-full h-full bg-gray-100 rounded-[36px] overflow-hidden">
                       <div className="bg-green-600 h-24 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
                       </div>
                       <div className="p-6 space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-24 bg-gray-200 rounded"></div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="h-16 bg-gray-200 rounded"></div>
                             <div className="h-16 bg-gray-200 rounded"></div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500 rounded-full blur-3xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-24 border-b border-gray-100">
             <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900">Lokasi Kantor Desa</h4>
                      <p className="text-sm text-gray-500">Jl. Desa Maju No. 01, Kec. Harmoni, Kab. Sejahtera, 12345</p>
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900">WhatsApp</h4>
                      <p className="text-sm text-gray-500">0812-3456-7890</p>
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900">Email</h4>
                      <p className="text-sm text-gray-500">info@desaku.go.id</p>
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900">Jam Layanan</h4>
                      <p className="text-sm text-gray-500">Senin - Jumat<br/>08.00 - 16.00 WIB</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 gap-6">
             <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Desaku. All rights reserved.</p>
             <div className="flex gap-8">
                <button className="text-sm text-gray-500 hover:text-green-600 font-medium">Kebijakan Privasi</button>
                <button className="text-sm text-gray-500 hover:text-green-600 font-medium">Syarat & Ketentuan</button>
                <button className="text-sm text-gray-500 hover:text-green-600 font-medium">Peta Situs</button>
             </div>
             <button className="w-10 h-10 bg-gray-100 hover:bg-green-600 hover:text-white rounded-xl flex items-center justify-center transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 15l-6-6-6 6" /></svg>
             </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
