import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import api from "../api/axios";
import "../styles/complaints.css";

const VillagerComplaints = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  return (
    <Layout>
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

          {/* LIST */}
          <div className="my-complaints">
            <h2>My Complaints</h2>

            {complaints.length === 0 && (
              <div className="empty-state">
                You haven’t submitted any complaints yet
              </div>
            )}

            <div className="complaint-list">
              {complaints.map((c) => (
                <div key={c._id} className="complaint-card">

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
              ))}
            </div>
          </div>

        </div>

      </PageWrapper>
    </Layout>
  );
};

export default VillagerComplaints;
