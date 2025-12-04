import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LeadDetail from "./pages/LeadDetail.jsx";
import { useState, useEffect } from "react";

export default function App() {
  const [authed, setAuthed] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setAuthed(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthed(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            Lead Scoring Portal
          </Link>
          <nav className="flex gap-2">
            {authed ? (
              <>
                <Link
                  className="text-sm text-gray-600 hover:text-black"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
                <button
                  className="text-sm text-gray-600 hover:text-black"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                className="text-sm text-gray-600 hover:text-black"
                to="/login"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={authed ? "/dashboard" : "/login"} replace />}
          />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={authed ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/leads/:id"
            element={authed ? <LeadDetail /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </main>
    </div>
  );
}
