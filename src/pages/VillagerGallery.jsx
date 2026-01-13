import { useEffect, useState } from "react";
// Layout removed
import PageWrapper from "../components/PageWrapper";
import Loader from "../components/Loader";
import api from "../api/axios";
import "../styles/villagerGallery.css";

const VillagerGallery = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback temple images
  const fallbackImages = [
    { _id: "1", title: "Temple View 1", fileUrl: "https://res.cloudinary.com/dcyjadpgm/image/upload/image-1768320181949_kr5sp3", mediaType: "image" },
    { _id: "2", title: "Temple View 2", fileUrl: "https://res.cloudinary.com/dcyjadpgm/image/upload/OIP_up13ii", mediaType: "image" },
    { _id: "3", title: "Temple View 3", fileUrl: "https://res.cloudinary.com/dcyjadpgm/image/upload/OIP_2_eg7f8j", mediaType: "image" },
    { _id: "4", title: "Temple View 4", fileUrl: "https://res.cloudinary.com/dcyjadpgm/image/upload/OIP_3_bawkv4", mediaType: "image" },
    { _id: "5", title: "Temple View 5", fileUrl: "https://res.cloudinary.com/dcyjadpgm/image/upload/OIP_4_nneku8", mediaType: "image" },
    { _id: "6", title: "Temple View 6", fileUrl: "https://res.cloudinary.com/dcyjadpgm/image/upload/OIP_5_zfzfty", mediaType: "image" },
    { _id: "7", title: "Temple View 7", fileUrl: "https://res.cloudinary.com/dcyjadpgm/image/upload/OIP_6_iutete", mediaType: "image" },
  ];

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await api.get("/gallery");
        // Only show Active items AND items served from Cloudinary
        const activeMedia = res.data.filter(
          (m) => m.isActive !== false && m.fileUrl && m.fileUrl.includes("cloudinary.com")
        );
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
    <>
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
    </>
  );
};

export default VillagerGallery;