import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import api from "../api/axios";
import "../styles/gallery.css";

const ManageGallery = () => {
  const [media, setMedia] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMedia = async () => {
    const res = await api.get("/gallery");
    setMedia(res.data);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const uploadMedia = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);

      await api.post("/gallery/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTitle("");
      setFile(null);
      fetchMedia();
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const disableMedia = async (id) => {
    if (!window.confirm("Disable this media item?")) return;
    await api.delete(`/gallery/${id}`);
    fetchMedia();
  };

  return (
    <Layout>
      <PageWrapper>

        <div className="gallery-page">

          {/* HEADER */}
          <div className="gallery-header">
            <h1>Temple Gallery Management</h1>
            <p>
              Upload and manage photos & videos shared with villagers
            </p>
          </div>

          {/* UPLOAD CARD */}
          <div className="upload-card">
            <h2>📤 Upload New Media</h2>

            <form onSubmit={uploadMedia}>
              <input
                placeholder="Media title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />

              <button disabled={loading}>
                {loading ? "Uploading..." : "Upload Media"}
              </button>
            </form>
          </div>

          {/* GALLERY GRID */}
          <div className="gallery-grid">
            {media.map((m) => (
              <div
                key={m._id}
                className={`gallery-card ${
                  m.isActive === false ? "disabled" : ""
                }`}
              >
                <div className="media-wrapper">
                  {m.mediaType === "image" ? (
                    <img
                      src={m.fileUrl}
                      alt={m.title}
                    />
                  ) : (
                    <video
                      src={m.fileUrl}
                      controls
                    />
                  )}
                </div>

                <div className="gallery-info">
                  <h3>{m.title}</h3>

                  {m.isActive !== false ? (
                    <button
                      onClick={() => disableMedia(m._id)}
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

      </PageWrapper>
    </Layout>
  );
};

export default ManageGallery;
