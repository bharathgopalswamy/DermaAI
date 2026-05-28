import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ScanSkin from "./pages/ScanSkin";
import ScanResult from "./pages/ScanResult";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scan" element={<ScanSkin />} />
        <Route path="/scan-result" element={<ScanResult />} />

        <Route path="/doctors" element={<Doctors />} />
        <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
        <Route path="/appointments" element={<MyAppointments />} />

        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;