import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setAuth } from "./authUtils";
import "../styles/form.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      setAuth(token, user);
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "committee") navigate("/committee");
      else navigate("/villager");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-auth-page">
      {/* LEFT SIDE: Visual Branding */}
      <div className="auth-visual">
        <img 
          src="/login-bg.png" 
          alt="Temple" 
          className="bg-image"
        />
        <div className="visual-overlay">
          <div className="branding-content">
            <span className="badge">Trusted by Thousands</span>
            <h1>Preserving Tradition <br/> Through Transparency</h1>
            <p>Join our village community in maintaining the sanctity and accountability of our sacred temples.</p>
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
            <div className="logo-circle">🏰</div>
            <h2>Welcome Back</h2>
            <p>Please enter your credentials</p>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="email@temple.com" 
                required 
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                required 
              />
            </div>
            <button type="submit" disabled={loading} className="submit-btn-glow">
              {loading ? "Verifying..." : "Login to Portal"}
            </button>
          </form>

          <div className="auth-switch">
            New here? <span onClick={() => navigate("/register")}>Create an Account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;