import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      {/* TOP NAV */}
      <Navbar />

      {/* BODY */}
      <div className="app-body">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
