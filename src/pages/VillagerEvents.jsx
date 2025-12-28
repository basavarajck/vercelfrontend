import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import Loader from "../components/Loader";
import api from "../api/axios";
import "../styles/villagerEvents.css";

const VillagerEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data.filter((e) => e.isActive !== false));
      } catch {
        console.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <Layout>
      <PageWrapper>

        <div className="villager-events-page">

          {/* HEADER */}
          <div className="villager-events-header">
            <h1>Temple Events & Festivals</h1>
            <p>
              Upcoming spiritual programs and celebrations
            </p>
          </div>

          {loading && <Loader />}

          {!loading && events.length === 0 && (
            <div className="empty-state">
              No upcoming events announced yet
            </div>
          )}

          {/* EVENTS LIST */}
          <div className="events-list">
            {events.map((e) => (
              <div key={e._id} className="event-card">

                {/* DATE BADGE */}
                <div className="event-date">
                  {new Date(e.startDate).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  {e.endDate && (
                    <>
                      <span className="date-separator">–</span>
                      {new Date(e.endDate).toLocaleDateString(undefined, {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </>
                  )}
                </div>

                {/* CONTENT */}
                <div className="event-content">
                  <h3>{e.title}</h3>
                  <p className="event-description">
                    {e.description}
                  </p>

                  {e.schedule && (
                    <div className="event-schedule">
                      ⏰ {e.schedule}
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>

      </PageWrapper>
    </Layout>
  );
};

export default VillagerEvents;
