import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, register, loading } = useAuth();
  const from = (location.state as any)?.from?.pathname || '/';
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotUsername, setForgotUsername] = useState('');
  const [forgotPassword, setForgotPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

  // Form states
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate(from);
    }
  }, [user, loading, navigate, from]);

  // Handle login submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (!loginData.username || !loginData.password) {
        throw new Error('Email/Nomor HP dan kata sandi wajib diisi');
      }

      await login(loginData.username, loginData.password);
      setSuccess('Login berhasil! Mengarahkan...');
      setTimeout(() => navigate(from), 800);
    } catch (err: any) {
      setError(err.message || 'Login gagal. Periksa kembali akun Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle register submit
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (!registerData.username || !registerData.password || !registerData.confirmPassword) {
        throw new Error('Semua field wajib diisi');
      }
      if (registerData.password !== registerData.confirmPassword) {
        throw new Error('Konfirmasi kata sandi tidak sesuai');
      }
      if (registerData.password.length < 6) {
        throw new Error('Kata sandi minimal 6 karakter');
      }

      await register({
        username: registerData.username,
        password: registerData.password,
        role: 'penduduk'
      });

      setSuccess('Registrasi berhasil! Silakan masuk.');
      setTimeout(() => {
        setIsLoginMode(true);
        setRegisterData({ username: '', password: '', confirmPassword: '' });
        setSuccess('');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Registrasi gagal');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotMessage('');
    try {
      if (!forgotUsername || !forgotPassword || !forgotConfirmPassword) {
        throw new Error('Semua field wajib diisi');
      }
      if (forgotPassword !== forgotConfirmPassword) {
        throw new Error('Konfirmasi kata sandi tidak sesuai');
      }
      if (forgotPassword.length < 6) {
        throw new Error('Kata sandi minimal 6 karakter');
      }
      
      const res = await authAPI.resetPassword({ username: forgotUsername, newPassword: forgotPassword });
      if (!res.data.success) {
        throw new Error(res.data.error || 'Gagal mereset kata sandi');
      }
      
      setForgotMessage('Kata sandi berhasil diubah! Silakan login.');
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotUsername('');
        setForgotPassword('');
        setForgotConfirmPassword('');
      }, 2000);
    } catch (err: any) {
      setForgotMessage(err.response?.data?.error || err.message || 'Terjadi kesalahan');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans">
      {/* Left Side: Info & Image */}
      <div className="hidden lg:flex lg:w-1/2 relative p-12 flex-col justify-between overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero_bg.png"
            alt="Village Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content Over Overlay */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white leading-tight">Desaku</h1>
              <p className="text-xs text-white/80">Layanan Desa dalam Genggaman</p>
            </div>
          </div>

          <div className="space-y-6 max-w-md">
            <p className="text-white font-medium text-lg">Selamat Datang di</p>
            <h2 className="text-6xl font-bold text-white leading-tight">Desaku</h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Akses berbagai layanan dan informasi desa secara mudah, cepat, dan transparan.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          {[
            { title: "Layanan Lengkap", desc: "Berbagai layanan administrasi desa dalam satu platform.", icon: "file" },
            { title: "Aman & Terpercaya", desc: "Data Anda aman bersama sistem kami yang terpercaya.", icon: "shield" },
            { title: "Informasi Terupdate", desc: "Dapatkan informasi terbaru seputar kegiatan desa.", icon: "bell" }
          ].map((feature, i) => (
            <div key={i} className="bg-white/95 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 shadow-xl max-w-sm transform hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                {feature.icon === 'file' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>}
                {feature.icon === 'shield' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
                {feature.icon === 'bell' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{feature.title}</h4>
                <p className="text-[11px] text-gray-500 leading-tight">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative">
        <div className="max-w-md w-full mx-auto space-y-10">
          <div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {isLoginMode ? 'Masuk' : 'Daftar Akun'}
            </h3>
            <p className="text-gray-500">
              {isLoginMode ? 'Masuk untuk mengakses layanan desa' : 'Buat akun untuk mulai menggunakan layanan desa'}
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm flex items-center gap-3 animate-shake">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 border border-green-100 rounded-2xl text-green-600 text-sm flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              {success}
            </div>
          )}

          {isLoginMode ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email atau Nomor HP</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-green-600 focus:ring-0 transition-all outline-none text-gray-700 placeholder:text-gray-300"
                    placeholder="Masukkan email atau nomor HP"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-700">Kata Sandi</label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs font-bold text-green-600 hover:text-green-700"
                  >
                    Lupa kata sandi?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-green-600 focus:ring-0 transition-all outline-none text-gray-700 placeholder:text-gray-300"
                    placeholder="Masukkan kata sandi"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold shadow-lg shadow-green-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading && <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>}
                Masuk
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Username / ID</label>
                <input
                  type="text"
                  className="w-full px-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-green-600 focus:ring-0 transition-all outline-none"
                  placeholder="Buat username unik"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Kata Sandi</label>
                <input
                  type="password"
                  className="w-full px-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-green-600 focus:ring-0 transition-all outline-none"
                  placeholder="Minimal 6 karakter"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Konfirmasi Kata Sandi</label>
                <input
                  type="password"
                  className="w-full px-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-green-600 focus:ring-0 transition-all outline-none"
                  placeholder="Ulangi kata sandi"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold shadow-lg shadow-green-200 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                Daftar Sekarang
              </button>
            </form>
          )}

          <div className="text-center pt-8">
            <p className="text-gray-500 text-sm">
              {isLoginMode ? 'Belum punya akun?' : 'Sudah punya akun?'} {' '}
              <button
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="font-bold text-green-600 hover:text-green-700"
              >
                {isLoginMode ? 'Daftar di sini' : 'Masuk di sini'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="absolute bottom-8 left-0 right-0 text-center space-y-4">
          <p className="text-[11px] text-gray-400">&copy; {new Date().getFullYear()} Desaku. Semua hak dilindungi.</p>
          <div className="flex justify-center gap-6">
            <button className="text-[11px] font-bold text-green-600/70 hover:text-green-600">Kebijakan Privasi</button>
            <button className="text-[11px] font-bold text-green-600/70 hover:text-green-600">Syarat & Ketentuan</button>
            <button className="text-[11px] font-bold text-green-600/70 hover:text-green-600">Bantuan</button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowForgotModal(false)}>
          <div className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl space-y-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900">Lupa Kata Sandi?</h3>
            <p className="text-sm text-gray-500">Masukkan username dan buat kata sandi baru Anda.</p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-green-600 rounded-2xl transition-all outline-none text-sm"
                placeholder="Username / ID"
                value={forgotUsername}
                onChange={e => setForgotUsername(e.target.value)}
              />
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-green-600 rounded-2xl transition-all outline-none text-sm"
                placeholder="Kata sandi baru (min. 6)"
                value={forgotPassword}
                onChange={e => setForgotPassword(e.target.value)}
              />
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-green-600 rounded-2xl transition-all outline-none text-sm"
                placeholder="Konfirmasi kata sandi baru"
                value={forgotConfirmPassword}
                onChange={e => setForgotConfirmPassword(e.target.value)}
              />
              {forgotMessage && <p className="text-xs font-bold" style={{ color: forgotMessage.includes('berhasil') ? 'green' : 'red' }}>{forgotMessage}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForgotModal(false)} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all">Batal</button>
                <button type="submit" className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200">Ganti Sandi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
