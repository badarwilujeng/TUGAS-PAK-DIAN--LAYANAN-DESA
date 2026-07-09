import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PendudukList from './pages/PendudukList';
import LayananList from './pages/LayananList';
import Profile from './pages/Profile';
import AdminStats from './pages/AdminStats';

import LandingPage from './pages/LandingPage';
import LayananPengajuan from './pages/LayananPengajuan';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        {/* Admin only routes */}
        <Route
          path="penduduk"
          element={
            <ProtectedRoute allowedRoles={['sekretaris', 'kapala_desa']}>
              <PendudukList />
            </ProtectedRoute>
          }
        />
        <Route
          path="layanan"
          element={
            <ProtectedRoute allowedRoles={['sekretaris', 'kapala_desa', 'penduduk']}>
              <LayananList />
            </ProtectedRoute>
          }
        />
        <Route
          path="layanan/pengajuan/:type"
          element={
            <ProtectedRoute allowedRoles={['penduduk', 'sekretaris', 'kapala_desa']}>
              <LayananPengajuan />
            </ProtectedRoute>
          }
        />
        <Route
          path="stats"
          element={
            <ProtectedRoute allowedRoles={['sekretaris', 'kapala_desa']}>
              <AdminStats />
            </ProtectedRoute>
          }
        />
        {/* Penduduk only */}
        <Route
          path="profile"
          element={
            <ProtectedRoute allowedRoles={['penduduk']}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
