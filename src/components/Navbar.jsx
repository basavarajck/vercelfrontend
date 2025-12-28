import { useNavigate } from "react-router-dom";
import { clearAuth, getUser } from "../auth/authUtils";
import "../styles/navbar.css";

const Navbar = () => {
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
        <h1>Temple Transparency System</h1>
        <p className="tagline">Community-driven temple management</p>
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
