import { useEffect, useState } from "react";
// Layout removed
import PageWrapper from "../components/PageWrapper";
import api from "../api/axios";
import "../styles/form.css";
import "../styles/table.css";

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const res = await api.get("/announcements");
    setAnnouncements(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addAnnouncement = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api.post("/announcements/add", { title, message });
    setTitle("");
    setMessage("");
    setLoading(false);
    fetchData();
  };

  const deleteAnnouncement = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    await api.delete(`/announcements/${id}`);
    fetchData();
  };

  return (
    <>
      <PageWrapper>

        {/* HEADER */}
        <div className="page-header">
          <h1>Manage Announcements</h1>
          <p>Create and manage official temple announcements</p>
        </div>

        {/* ADD ANNOUNCEMENT */}
        <div className="form-card">
          <form onSubmit={addAnnouncement}>
            <div className="form-group">
              <label>Title</label>
              <input
                placeholder="Announcement title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                placeholder="Announcement details"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              disabled={loading}
              className="primary-btn"
            >
              {loading ? "Posting..." : "Post Announcement"}
            </button>
          </form>
        </div>

        {/* ANNOUNCEMENT LIST */}
        <div className="announcement-list">
          {announcements.length === 0 ? (
            <p className="muted mt-4">No announcements yet</p>
          ) : (
            announcements.map((a) => (
              <div key={a._id} className="announcement-card">
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.message}</p>
                </div>

                <button
                  onClick={() => deleteAnnouncement(a._id)}
                  className="danger-link"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

      </PageWrapper>
    </>
  );
};

export default ManageAnnouncements;
