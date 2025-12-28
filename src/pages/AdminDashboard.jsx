import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Layout removed
import PageWrapper from "../components/PageWrapper";
import api from "../api/axios";
import "../styles/dashboard.css"; // 👈 new CSS

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    pendingExpenses: 0,
    recentLogs: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, expensesRes, logsRes] = await Promise.all([
          api.get("/admin/users"),
          api.get("/admin/pending-expenses"),
          api.get("/activity-logs?limit=5"),
        ]);

        setStats({
          users: usersRes.data.length,
          pendingExpenses: expensesRes.data.length,
          recentLogs: logsRes.data.logs || [],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageWrapper>

        {/* HEADER */}
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Temple management overview & controls</p>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <StatCard
            title="Total Users"
            value={loading ? "—" : stats.users}
            icon="👥"
          />
          <StatCard
            title="Pending Expenses"
            value={loading ? "—" : stats.pendingExpenses}
            icon="💰"
          />
          <StatCard
            title="Recent Activities"
            value={loading ? "—" : stats.recentLogs.length}
            icon="📜"
          />
        </div>

        {/* MAIN GRID */}
        <div className="dashboard-grid">

          {/* QUICK ACTIONS */}
          <div className="dashboard-card">
            <h2 className="card-title">Quick Actions</h2>
            <div className="actions-grid">
              <ActionButton label="Manage Users" onClick={() => navigate("/admin/users")} />
              <ActionButton label="Approve Expenses" onClick={() => navigate("/admin/expenses")} />
              <ActionButton label="Audit Logs" onClick={() => navigate("/admin/activity-logs")} />
              <ActionButton label="Monthly Reports" onClick={() => navigate("/admin/reports")} />
              <ActionButton label="Lock Month" onClick={() => navigate("/admin/lock")} />
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="dashboard-card">
            <h2 className="card-title">Recent Activity</h2>

            {loading ? (
              <p className="muted">Loading...</p>
            ) : stats.recentLogs.length === 0 ? (
              <p className="muted">No recent activity</p>
            ) : (
              <ul className="activity-list">
                {stats.recentLogs.map((log) => (
                  <li key={log._id}>
                    <strong>{(log.action || "UNKNOWN_ACTION").replace(/_/g, " ")}</strong>
                    <span>
                      {log.performedBy?.name || "Unknown"} ·{" "}
                      {new Date(log.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <button
              className="link-btn"
              onClick={() => navigate("/admin/activity-logs")}
            >
              View all logs →
            </button>
          </div>

        </div>
      </PageWrapper>
    </>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="stat-card">
    <span className="stat-icon">{icon}</span>
    <div>
      <p className="stat-title">{title}</p>
      <p className="stat-value">{value}</p>
    </div>
  </div>
);

const ActionButton = ({ label, onClick }) => (
  <button className="action-btn" onClick={onClick}>
    {label}
    <span>→</span>
  </button>
);

export default AdminDashboard;
