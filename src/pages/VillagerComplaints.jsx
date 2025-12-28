import { useEffect, useState } from "react";
// Layout removed
import PageWrapper from "../components/PageWrapper";
import api from "../api/axios";
import { getUser } from "../auth/authUtils";
import "../styles/complaints.css";

const VillagerComplaints = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const user = getUser(); // Get current user

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints/my");
      setComplaints(res.data);
    } catch {
      setError("Failed to load complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/complaints/add", { title, message });
      setSuccess("Complaint submitted successfully");
      setTitle("");
      setMessage("");
      fetchComplaints();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit complaint"
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter Complaints
  const myComplaints = complaints.filter(c => c.createdBy === user?.id || c.createdBy?._id === user?.id || c.createdBy === user?._id);
  const otherComplaints = complaints.filter(c => {
     // Check if createdBy matches user ID (handle both populated object and direct ID string)
     const ownerId = c.createdBy?._id || c.createdBy;
     const myId = user?.id || user?._id;
     return ownerId !== myId;
  });

  const ComplaintCard = ({ c }) => (
    <div className="complaint-card">
      <div className="complaint-top">
        <h3>{c.title}</h3>
        <span className={`status ${c.status}`}>
          {c.status.replace("-", " ")}
        </span>
      </div>

      <p className="complaint-message">
        {c.message}
      </p>

      {c.reply && (
        <div className="complaint-reply">
          <strong>Committee Reply</strong>
          <p>{c.reply}</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <PageWrapper>

        <div className="complaints-page">

          {/* HEADER */}
          <div className="complaints-header">
            <h1>Complaints & Suggestions</h1>
            <p>
              Submit concerns or suggestions regarding temple management
            </p>
          </div>

          {/* SUBMIT FORM */}
          <div className="complaint-form-card">
            <h2>Submit a Complaint</h2>

            {error && <div className="alert error">{error}</div>}
            {success && <div className="alert success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  placeholder="Brief subject of your complaint"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  placeholder="Explain your concern in detail"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button disabled={loading} className="primary-btn">
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>
            </form>
          </div>

          {/* SECTION 1: MY COMPLAINTS */}
          <div className="my-complaints">
            <h2 className="section-title">My Complaints</h2>

            {myComplaints.length === 0 ? (
              <div className="empty-state">
                You haven't submitted any complaints yet.
              </div>
            ) : (
              <div className="complaint-list">
                {myComplaints.map(c => <ComplaintCard key={c._id} c={c} />)}
              </div>
            )}
          </div>

          {/* SECTION 2: COMMUNITY COMPLAINTS */}
          <div className="community-complaints" style={{ marginTop: "40px" }}>
            <h2 className="section-title">Community Complaints (Others)</h2>

            {otherComplaints.length === 0 ? (
              <div className="empty-state">
                No complaints from others yet.
              </div>
            ) : (
              <div className="complaint-list">
                {otherComplaints.map(c => <ComplaintCard key={c._id} c={c} />)}
              </div>
            )}
          </div>

        </div>

      </PageWrapper>
    </>
  );
};

export default VillagerComplaints;
