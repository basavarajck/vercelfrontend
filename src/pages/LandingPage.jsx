import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/landing.css";

const templeImages = [
  "/Temple1.png",
  "/Temple2.png",
  "/Temple3.png",
  "/Temple4.png",
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % templeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="landing-nav glass">
        <div className="nav-logo">🏰 TempleSystem</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#roles">Roles</a>
          <button className="nav-login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="nav-register" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-carousel">
          {templeImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Temple"
              className={`carousel-img ${i === index ? "active" : ""}`}
            />
          ))}
          <div className="overlay"></div>
        </div>

        <div className="hero-content fade-up">
          <h1>
            Temple Transparency <br /> Management System
          </h1>
          <p>
            Bringing trust, accountability, and transparency to
            village temple management through technology.
          </p>

          <div className="hero-actions">
            <button onClick={() => navigate("/login")}>Get Started</button>
            <button className="outline" onClick={() => navigate("/register")}>
              Join as Villager
            </button>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="why">
        <h2>Why This System?</h2>
        <div className="why-grid">
          <div className="why-card hover">
            <span>💰</span>
            <h3>Financial Transparency</h3>
            <p>Every income and expense is visible with proof.</p>
          </div>
          <div className="why-card hover">
            <span>🛡️</span>
            <h3>No Misuse of Funds</h3>
            <p>Admin approval & monthly locking ensure integrity.</p>
          </div>
          <div className="why-card hover">
            <span>📢</span>
            <h3>Clear Communication</h3>
            <p>Instant updates, announcements & festivals.</p>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="roles">
        <h2>User Roles</h2>
        <div className="roles-grid">
          <div className="role-card lift">
            <h3>👨‍👩‍👧 Villagers</h3>
            <ul>
              <li>View income & expenses</li>
              <li>Announcements & events</li>
              <li>Complaints & suggestions</li>
            </ul>
          </div>
          <div className="role-card lift">
            <h3>🧑‍💼 Committee</h3>
            <ul>
              <li>Add income & expenses</li>
              <li>Upload proofs</li>
              <li>Manage gallery</li>
            </ul>
          </div>
          <div className="role-card lift">
            <h3>👑 Admin</h3>
            <ul>
              <li>Approve expenses</li>
              <li>Lock reports</li>
              <li>Audit logs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="modules">
        <h2>Core Features</h2>
        <div className="modules-grid">
          <div className="module glow">📊 Income & Expense</div>
          <div className="module glow">🗓️ Events</div>
          <div className="module glow">📢 Announcements</div>
          <div className="module glow">🧾 PDF Reports</div>
          <div className="module glow">📸 Gallery</div>
          <div className="module glow">🛡️ Role Access</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Built for Villages. Trusted by People.</h2>
        <p>Transparency is a responsibility.</p>
        <button onClick={() => navigate("/login")}>Get Started</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Temple Transparency Management System</p>
        <p className="sub">Designed for village temples • Built with integrity</p>
      </footer>
    </div>
  );
};

export default LandingPage;
