import { useNavigate } from "react-router-dom";
// Layout removed (centralized in ProtectedRoute)
import PageWrapper from "../components/PageWrapper";
import "../styles/dashboard.css";

const VillagerDashboard = () => {
  const navigate = useNavigate();

  const actions = [
    { title: "Income & Expenses", path: "/villager/income-expense", icon: "💰" },
    { title: "Announcements", path: "/villager/announcements", icon: "📢" },
    { title: "Events & Festivals", path: "/villager/events", icon: "🎉" },
    { title: "Photo Gallery", path: "/villager/gallery", icon: "🖼️" },
    { title: "Complaints & Suggestions", path: "/villager/complaints", icon: "📝" },
  ];

  return (
    <>
      <PageWrapper>

        {/* HEADER */}
        <div className="dashboard-header">
          <h1>Welcome to Temple Portal</h1>
          <p>View temple activities, finances & updates</p>
        </div>

        {/* ACTIONS */}
        <div className="villager-actions">
          {actions.map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="villager-card"
            >
              <span className="icon">{action.icon}</span>
              <span className="title">{action.title}</span>
              <span className="arrow">→</span>
            </button>
          ))}
        </div>

      </PageWrapper>
    </>
  );
};

export default VillagerDashboard;
