import { useEffect, useState } from "react";
// Layout removed
import PageWrapper from "../components/PageWrapper";
import Loader from "../components/Loader";
import api from "../api/axios";
import "../styles/table.css";

const AdminAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/activity-logs", {
        params: action ? { action } : {},
      });
      setLogs(res.data.logs);
    } catch {
      alert("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
      <PageWrapper>

        {/* HEADER */}
        <div className="page-header">
          <h1>Audit Logs</h1>
          <p>Complete activity history for transparency & accountability</p>
        </div>

        {/* FILTER BAR */}
        <div className="filter-bar">
          <select
            className="filter-select"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          >
            <option value="">All Actions</option>
            <option value="ADD_INCOME">Add Income</option>
            <option value="ADD_EXPENSE">Add Expense</option>
            <option value="APPROVE_EXPENSE">Approve Expense</option>
            <option value="LOCK_MONTH">Lock Month</option>
            <option value="CREATE_ANNOUNCEMENT">Create Announcement</option>
            <option value="UPDATE_EVENT">Update Event</option>
            <option value="UPLOAD_MEDIA">Upload Media</option>
          </select>

          <button className="primary-btn" onClick={fetchLogs}>
            Apply Filter
          </button>
        </div>

        {loading && <Loader />}

        {!loading && logs.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg font-medium">
              No audit logs found
            </p>
            <p className="text-sm">
              System activity will appear here
            </p>
          </div>
        )}

        {!loading && logs.length > 0 && (
          <div className="table-card">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th>Entity</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td className="muted">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>

                    <td>
                      <div className="user-cell">
                        <div className="avatar">
                          {log.performedBy?.name?.charAt(0) || "?"}
                        </div>
                        <span>{log.performedBy?.name || "Unknown"}</span>
                      </div>
                    </td>

                    <td>
                      <span className={`role-badge ${log.performedBy?.role}`}>
                        {log.performedBy?.role}
                      </span>
                    </td>

                    <td>
                      <strong>
                        {log.action.replace(/_/g, " ")}
                      </strong>
                    </td>

                    <td className="muted">
                      {log.entityType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </PageWrapper>
    </>
  );
};

export default AdminAuditLogs;
