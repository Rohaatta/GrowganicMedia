import { useState, useEffect } from "react";
import AdminLogin from "../admin/AdminLogin";
import AdminDashboard from "../admin/AdminDashboard";
import "../admin/admin.css";

export default function Admin() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [checkedStorage, setCheckedStorage] = useState(false);

  // Stay logged in across refreshes — same keys AdminLogin.jsx already writes to.
  useEffect(() => {
    const savedToken = localStorage.getItem("hassan_admin_token");
    const savedUsername = localStorage.getItem("hassan_admin_username");
    if (savedToken && savedUsername) {
      setToken(savedToken);
      setUsername(savedUsername);
    }
    setCheckedStorage(true);
  }, []);

  function handleLoginSuccess(newToken, newUsername) {
    setToken(newToken);
    setUsername(newUsername);
  }

  function handleLogout() {
    localStorage.removeItem("hassan_admin_token");
    localStorage.removeItem("hassan_admin_username");
    setToken(null);
    setUsername(null);
  }

  // Avoid a login-screen flash while we check localStorage on first render.
  if (!checkedStorage) return null;

  return (
    <div className="admin-shell">
      {token ? (
        <AdminDashboard token={token} username={username} onLogout={handleLogout} />
      ) : (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
