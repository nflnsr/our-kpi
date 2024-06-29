import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";

import ProtectedRoute from "@/routes/protected-route";
import PrivateRoute from "@/routes/private-route";

import LandingPage from "@/pages/landing-page";
import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import Dashboard from "@/pages/dashboard";
import Notfound from "@/pages/not-found";
import Penilaian from "@/pages/penilaian";
import Laporan from "@/pages/laporan";
import Rekomendasi from "@/pages/rekomendasi";
import Month from "@/pages/month";
import Departements from "@/pages/departements";
import PanduanPengisianKaryawan from "@/pages/panduan-pengisian-karyawan";
import PanduanPengisianAdmin from "@/pages/panduan-pengisian-admin";

function Index() {
  const navigate = useNavigate();
  const globalRoute = {
    navigate: navigate as NavigateFunction,
  };
  globalRoute.navigate = navigate;
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/penilaians" element={<Month />} />
        <Route path="/penilaians/:bulan" element={<Penilaian />} />
        <Route path="/penilaians/admin" element={<Departements />} />
        <Route path="/penilaians/admin/:departements" element={<Month />} />
        <Route path="/penilaians/admin/:departements/:bulan" element={<Penilaian />} />
        <Route path="/laporan" element={<Month />} />
        <Route path="/laporan/:bulan" element={<Laporan />} />
        <Route path="/laporan/admin" element={<Departements />} />
        <Route path="/laporan/admin/:departements" element={<Month />} />
        <Route path="/laporan/admin/:departements/:bulan" element={<Laporan />} />
        <Route path="/rekomendasi" element={<Month />} />
        <Route path="/rekomendasi/:bulan" element={<Rekomendasi />} />
        <Route path="/panduan-pengisian-karyawan" element={<PanduanPengisianKaryawan />} />
        <Route path="/panduan-pengisian-admin" element={<PanduanPengisianAdmin />} />
      </Route>
      <Route>
        <Route path="/404" element={<Notfound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default Index;
