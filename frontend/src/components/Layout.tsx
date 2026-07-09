import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard', label: 'Beranda', icon: 'home' },
    { to: '/profile', label: 'Profil Desa', icon: 'user' },
    { to: '/dashboard/layanan', label: 'Layanan Surat', icon: 'file-text', active: location.pathname.includes('/layanan') },
    { to: '/dashboard/permohonan', label: 'Permohonan', icon: 'clipboard' },
    { to: '/dashboard/informasi', label: 'Informasi', icon: 'info' },
    { to: '/dashboard/pengaduan', label: 'Pengaduan', icon: 'message-square' },
    { to: '/dashboard/kontak', label: 'Kontak', icon: 'phone' },
  ];

  const isActive = (path: string) => location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));

  const Icon = ({ name }: { name: string }) => {
    switch (name) {
      case 'home': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
      case 'user': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
      case 'file-text': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
      case 'clipboard': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>;
      case 'info': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>;
      case 'message-square': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>;
      case 'phone': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar */}
      <aside className={`bg-white w-72 border-r border-gray-100 flex flex-col fixed inset-y-0 z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-100">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Desaku</h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Layanan Desa</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 group ${
                isActive(link.to) 
                ? 'bg-green-50 text-green-600 shadow-sm shadow-green-50' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className={`${isActive(link.to) ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-900'}`}>
                <Icon name={link.icon} />
              </div>
              {link.label}
              {isActive(link.to) && <div className="ml-auto w-1.5 h-1.5 bg-green-600 rounded-full"></div>}
            </Link>
          ))}
        </nav>

        <div className="p-6">
          <div className="bg-green-50 rounded-[32px] p-6 space-y-4 border border-green-100">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white">
                   <Icon name="phone" />
                </div>
                <div className="text-[10px] text-gray-500 font-bold uppercase leading-none">Butuh bantuan?</div>
             </div>
             <p className="text-xs font-bold text-gray-700">085920039607</p>
             <button className="w-full bg-white text-green-600 border border-green-200 py-2.5 rounded-xl text-xs font-bold hover:bg-green-600 hover:text-white transition-all shadow-sm">
                Hubungi Sekarang
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-72">
        {/* Topbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex-1 max-w-xl">
             <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                </div>
                <input 
                   type="text" 
                   placeholder="Cari layanan atau informasi..." 
                   className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-transparent focus:bg-white focus:border-green-600 rounded-2xl outline-none transition-all text-sm text-gray-600"
                />
             </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-3 pr-6 border-r border-gray-100">
                <div className="text-right">
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Butuh bantuan?</p>
                   <p className="text-sm font-bold text-gray-900">085920039607</p>
                </div>
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
                </div>
             </div>

             <div className="flex items-center gap-4">
                <button className="relative w-10 h-10 bg-gray-50 hover:bg-green-50 rounded-full flex items-center justify-center text-gray-400 hover:text-green-600 transition-all">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
                   <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                <div className="flex items-center gap-3 cursor-pointer group">
                   <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-transparent group-hover:border-green-600 transition-all">
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                         {user?.username?.[0].toUpperCase()}
                      </div>
                   </div>
                   <div className="hidden lg:block">
                      <p className="text-sm font-bold text-gray-900 leading-none mb-1">{user?.username}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{user?.role}</p>
                   </div>
                </div>

                <button 
                  onClick={handleLogout}
                  className="w-10 h-10 bg-gray-50 hover:bg-red-50 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 transition-all"
                  title="Logout"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 01-2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
                </button>
             </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="px-8 py-6 flex flex-col md:flex-row justify-between items-center text-gray-400 border-t border-gray-100 gap-4 mt-auto">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
              </div>
              <p className="text-xs font-bold">Desaku</p>
              <p className="text-xs">© {new Date().getFullYear()} Desaku. Semua hak dilindungi.</p>
           </div>
           <p className="text-xs font-medium italic">Melayani dengan cepat, mudah dan transparan.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
