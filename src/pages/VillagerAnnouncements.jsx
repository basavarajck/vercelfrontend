import { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import Loader from "../components/Loader";
import api from "../api/axios";
import "../styles/announcements.css";

const VillagerAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await api.get("/announcements");
        setAnnouncements(res.data);
      } catch {
        console.error("Failed to load announcements");
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Mouse tilt animation logic
  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Intensity of tilt (higher number = more tilt)
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (card) => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <Layout>
      <PageWrapper>
        <div className="announcements-page">
          <div className="announcements-header">
            <h1>Temple Announcements</h1>
            <p>Important notices and official updates for villagers</p>
          </div>

          {loading && <Loader />}

          {!loading && announcements.length === 0 && (
            <div className="empty-state">No announcements available at the moment</div>
          )}

          <div className="notice-list">
            {announcements.map((a) => (
              <div 
                key={a._id} 
                className="notice-card interactive-tilt"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <div className="notice-date">
                  {new Date(a.createdAt).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                <div className="notice-content">
                  <h3>{a.title}</h3>
                  <p>{a.message}</p>
                </div>
                
                {/* 3D Reflection Effect */}
                <div className="card-glare"></div>
              </div>
            ))}
          </div>
        </div>
      </PageWrapper>
    </Layout>
  );
};

export default VillagerAnnouncements;