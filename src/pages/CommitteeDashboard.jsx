import { useNavigate } from "react-router-dom";
// Layout removed
import PageWrapper from "../components/PageWrapper";
import "../styles/dashboard.css";

const CommitteeDashboard = () => {
  const navigate = useNavigate();

  const actions = [
    { title: "Add Income", path: "/committee/income" },
    { title: "Add Expense", path: "/committee/expense" },
    { title: "Manage Announcements", path: "/committee/announcements" },
    { title: "Manage Events", path: "/committee/events" },
    { title: "Manage Gallery", path: "/committee/gallery" },
    { title: "Manage Complaints", path: "/committee/complaints" },
  ];

  return (
    <>
      <PageWrapper>

        {/* HEADER */}
        <div className="dashboard-header">
          <h1>Committee Dashboard</h1>
          <p>Daily operations & temple activities</p>
        </div>

        {/* ACTION CARDS */}
        <div className="committee-actions">
          {actions.map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="committee-card"
            >
              <span>{action.title}</span>
              <span className="arrow">→</span>
            </button>
          ))}
        </div>

      </PageWrapper>
    </>
  );
};

export default CommitteeDashboard;
