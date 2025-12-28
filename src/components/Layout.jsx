import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/layout.css";

const Layout = ({ children }) => {
  // Default to closed on mobile (<768), open on desktop
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {/* TOP NAV */}
      <Navbar onToggleSidebar={toggleSidebar} />

      {/* BODY */}
      <div className="app-body">
        {/* SIDEBAR */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* MAIN CONTENT */}
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
