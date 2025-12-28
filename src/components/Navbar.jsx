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
        <button onClick={onToggleSidebar} className="hamburger-btn" aria-label="Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
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
