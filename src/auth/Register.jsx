import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/form.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // 3D Tilt Effect Logic (Matches Login)
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role: "villager",
      });

      setSuccess("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-auth-page">
      {/* LEFT SIDE: Visual Branding (Matching Login Style) */}
      <div className="auth-visual">
        <img 
          src="/register-bg.png" 
          alt="Temple Community" 
          className="bg-image"
        />
        <div className="visual-overlay">
          <div className="branding-content">
            <span className="badge">Community First</span>
            <h1>A Stronger Village <br/> Through Unity</h1>
            <p>Create your account to participate in temple festivals, view transparent financial reports, and stay connected with your community.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Form Portal */}
      <div className="auth-form-side">
        <div 
          className="auth-card-modern interactive-3d"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="auth-header">
            <div className="logo-circle">📜</div>
            <h2>Create Account</h2>
            <p>Join the Temple Management System</p>
          </div>

          {/* FEEDBACK BANNERS */}
          {error && <div className="error-banner animate-shake">{error}</div>}
          {success && <div className="success-banner animate-pop">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-btn-glow"
            >
              {loading ? "Creating Account..." : "Register as Villager"}
            </button>
          </form>

          <div className="auth-switch">
            Already registered?{" "}
            <span onClick={() => navigate("/login")}>
              Login here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;