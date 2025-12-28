import { useNavigate } from "react-router-dom";
import { clearAuth, getUser } from "../auth/authUtils";
import "../styles/navbar.css";

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        {/* HAMBURGER (Mobile Only) */}
        <button onClick={onToggleSidebar} className="hamburger-btn">
          ☰
        </button>
        <h1>Temple System</h1>
        <p className="tagline">Community-driven management</p>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <div className="user-info">
          <span className="name">{user?.name}</span>
          <span className="role">{user?.role}</span>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
