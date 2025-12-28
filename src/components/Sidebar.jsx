import { Link, useLocation } from "react-router-dom";
import { getUser } from "../auth/authUtils";
import "../styles/sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const user = getUser();
  const location = useLocation();

  const menu = {
    villager: [
      { label: "Dashboard", path: "/villager" },
      { label: "Income & Expense", path: "/villager/income-expense" },
      { label: "Announcements", path: "/villager/announcements" },
      { label: "Events", path: "/villager/events" },
      { label: "Gallery", path: "/villager/gallery" },
      { label: "Complaints", path: "/villager/complaints" },
    ],
    committee: [
      { label: "Dashboard", path: "/committee" },
      { label: "Add Income", path: "/committee/income" },
      { label: "Add Expense", path: "/committee/expense" },
      { label: "Complaints", path: "/committee/complaints" },
      { label: "Events", path: "/committee/events" },
      { label: "Announcements", path: "/committee/announcements" },
      { label: "Gallery Upload", path: "/committee/gallery" },
    ],
    admin: [
      { label: "Dashboard", path: "/admin" },
      { label: "Approve Expenses", path: "/admin/expenses" },
      { label: "Lock Month", path: "/admin/lock" },
      { label: "Reports", path: "/admin/reports" },
      { label: "Audit Logs", path: "/admin/activity-logs" },
      { label: "Manage Users", path: "/admin/users" },
      { label: "Gallery Upload", path: "/committee/gallery" }, // Admin shares committee route
    ],
  };

  return (
    <>
      {/* MOBILE BACKDROP */}
      {isOpen && window.innerWidth <= 768 && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* HEADER */}
        <div className="sidebar-header">
          <div>
            <h2>Temple Portal</h2>
            <p>{user?.role?.toUpperCase()}</p>
          </div>
          {/* CLOSE BTN (Mobile) */}
          <button className="close-sidebar-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* MENU */}
        <nav className="sidebar-menu">
          {menu[user?.role]?.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                onClick={onClose} // Auto-close on mobile when link clicked
              >
                <span>{item.label}</span>
                <span className="arrow">→</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
