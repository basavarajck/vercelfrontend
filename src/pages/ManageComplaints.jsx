import { useEffect, useState } from "react";
// Layout removed
import PageWrapper from "../components/PageWrapper";
import Loader from "../components/Loader";
import api from "../api/axios";
import "../styles/form.css";
import "../styles/table.css";

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints");
      setComplaints(res.data);
    } catch {
      setError("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateComplaint = async (id, status, reply) => {
    try {
      await api.put(`/complaints/${id}`, { status, reply });
      fetchComplaints();
    } catch {
      alert("Failed to update complaint");
    }
  };

  return (
    <>
      <PageWrapper>

        {/* HEADER */}
        <div className="page-header">
          <h1>Manage Complaints</h1>
          <p>Review, respond, and resolve villager concerns</p>
        </div>

        {loading && <Loader />}

        {error && <div className="error-box">{error}</div>}

        {!loading && complaints.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg font-medium">
              No complaints available
            </p>
            <p className="text-sm">
              All issues are currently resolved
            </p>
          </div>
        )}

        {/* COMPLAINT LIST */}
        <div className="complaint-list">
          {complaints.map((c) => (
            <ComplaintCard
              key={c._id}
              complaint={c}
              onUpdate={updateComplaint}
            />
          ))}
        </div>

      </PageWrapper>
    </>
  );
};

const ComplaintCard = ({ complaint, onUpdate }) => {
  const [reply, setReply] = useState(complaint.reply || "");
  const [status, setStatus] = useState(complaint.status);

  return (
    <div className="complaint-card">

      {/* HEADER */}
      <div className="complaint-header">
        <div>
          <h3>{complaint.title}</h3>
          <p className="muted">
            By {complaint.createdBy?.name || "Villager"} •{" "}
            {new Date(complaint.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span className={`status-badge ${status}`}>
          {status.replace("-", " ")}
        </span>
      </div>

      {/* MESSAGE */}
      <p className="complaint-message">
        {complaint.message}
      </p>

      {/* ACTIONS */}
      <div className="complaint-actions">

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="form-group">
          <label>Reply</label>
          <textarea
            placeholder="Write a response to the villager..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </div>

        <button
          onClick={() =>
            onUpdate(complaint._id, status, reply)
          }
          className="primary-btn"
        >
          Update Complaint
        </button>
      </div>

    </div>
  );
};

export default ManageComplaints;
