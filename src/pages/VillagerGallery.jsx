import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import Loader from "../components/Loader";
import api from "../api/axios";
import "../styles/villagerGallery.css";

const VillagerGallery = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback high-quality temple images from Unsplash
  const fallbackImages = [
    { _id: "f1", title: "Temple Dawn", fileUrl: "https://images.unsplash.com/photo-1544735745-b81216c7db0c?auto=format&fit=crop&w=800&q=80", mediaType: "image" },
    { _id: "f2", title: "Ritual Lights", fileUrl: "https://images.unsplash.com/photo-1561053720-76cd73ff22c3?auto=format&fit=crop&w=800&q=80", mediaType: "image" },
    { _id: "f3", title: "Festival Colors", fileUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&q=80", mediaType: "image" },
    { _id: "f4", title: "Ancient Carvings", fileUrl: "https://images.unsplash.com/photo-1624446001478-f09623838634?auto=format&fit=crop&w=800&q=80", mediaType: "image" },
    { _id: "f5", title: "Spiritual Path", fileUrl: "https://images.unsplash.com/photo-1609348236104-e9029965935b?auto=format&fit=crop&w=800&q=80", mediaType: "image" },
    { _id: "f6", title: "Morning Prayer", fileUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80", mediaType: "image" },
  ];

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await api.get("/gallery");
        const activeMedia = res.data.filter((m) => m.isActive !== false);
        setMedia(activeMedia.length > 0 ? activeMedia : fallbackImages);
      } catch {
        console.error("Failed to load gallery");
        setMedia(fallbackImages);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);



  // Split media into two rows
  const row1 = media.filter((_, idx) => idx % 2 === 0);
  const row2 = media.filter((_, idx) => idx % 2 !== 0);

  const GalleryRow = ({ items, directionClass }) => (
    <div className={`gallery-marquee ${directionClass}`}>
      <div className="marquee-content">
        {items.map((m) => (
          <div key={m._id} className="gallery-card">
            {m.mediaType === "image" ? (
              <img src={m.fileUrl} alt={m.title} />
            ) : (
              <video src={m.fileUrl} controls />
            )}
            <div className="gallery-overlay">
              <h3>{m.title}</h3>
            </div>
          </div>
        ))}
      </div>
      {/* Duplicate for infinite effect */}
      <div className="marquee-content" aria-hidden="true">
        {items.map((m) => (
          <div key={`clone-${m._id}`} className="gallery-card">
            {m.mediaType === "image" ? (
              <img src={m.fileUrl} alt={m.title} />
            ) : (
              <video src={m.fileUrl} controls />
            )}
            <div className="gallery-overlay">
              <h3>{m.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Layout>
      <PageWrapper>
        <div className="gallery-page">
          <div className="gallery-header">
            <h1>Temple Gallery</h1>
            <p>Memories from festivals, rituals, and special occasions</p>
          </div>

          {loading && <Loader />}

          {!loading && (
            <div className="multi-row-container">
              {/* Row 1: Scrolls Left */}
              <GalleryRow items={row1} directionClass="left" />
              
              {/* Row 2: Scrolls Right */}
              <GalleryRow items={row2} directionClass="right" />
            </div>
          )}
        </div>
      </PageWrapper>
    </Layout>
  );
};

export default VillagerGallery;