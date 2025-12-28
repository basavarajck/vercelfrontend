import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import api from "../api/axios";
import "../styles/events.css";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schedule, setSchedule] = useState("");
  const [success, setSuccess] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = async (e) => {
    e.preventDefault();
    setSuccess("");

    try {
      await api.post("/events/add", {
        title,
        description,
        startDate,
        endDate,
        schedule,
      });

      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setSchedule("");
      setSuccess("Event created successfully");
      fetchEvents();
    } catch {
      alert("Failed to add event");
    }
  };

  const disableEvent = async (id) => {
    if (!window.confirm("Disable this event?")) return;
    await api.delete(`/events/${id}`);
    fetchEvents();
  };

  return (
    <Layout>
      <PageWrapper>
        <div className="events-page">

          {/* HEADER */}
          <div className="events-header">
            <h1>Manage Events & Festivals</h1>
            <p>Create, update, and manage temple programs</p>
          </div>

          <div className="events-grid">

            {/* CREATE EVENT */}
            <div className="event-form-card">
              <h2>📅 Add New Event</h2>

              {success && (
                <div className="success-box">
                  ✅ {success}
                </div>
              )}

              <form onSubmit={addEvent}>
                <input
                  placeholder="Event title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <textarea
                  placeholder="Event description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                <div className="date-row">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <input
                  placeholder="Schedule (optional)"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                />

                <button type="submit">Create Event</button>
              </form>
            </div>

            {/* EVENTS LIST */}
            <div className="event-list">
              <h2>
                Current Events
                <span className="count">{events.length}</span>
              </h2>

              {events.length === 0 && (
                <div className="empty-state">
                  <p className="icon">📭</p>
                  <p className="title">No events scheduled</p>
                  <p className="sub">Create one to inform villagers</p>
                </div>
              )}

              {events.map((e) => (
                <div
                  key={e._id}
                  className={`event-card ${
                    e.isActive === false ? "disabled" : "active"
                  }`}
                >
                  <div className="event-main">
                    <h3>{e.title}</h3>

                    <p className="date">
                      🗓️{" "}
                      {new Date(e.startDate).toLocaleDateString()}
                      {e.endDate &&
                        ` → ${new Date(e.endDate).toLocaleDateString()}`}
                    </p>

                    {e.schedule && (
                      <p className="schedule">⏰ {e.schedule}</p>
                    )}

                    <p className="desc">{e.description}</p>
                  </div>

                  <div className="event-actions">
                    {e.isActive !== false ? (
                      <button
                        onClick={() => disableEvent(e._id)}
                        className="danger"
                      >
                        Disable
                      </button>
                    ) : (
                      <span className="status">Disabled</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageWrapper>
    </Layout>
  );
};

export default ManageEvents;
