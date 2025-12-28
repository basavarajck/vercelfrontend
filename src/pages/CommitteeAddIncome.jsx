import { useState } from "react";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import api from "../api/axios";
import "../styles/form.css";

const CommitteeAddIncome = () => {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [proof, setProof] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("source", source);
      formData.append("date", date);
      formData.append("description", description);
      if (proof) formData.append("proof", proof);

      await api.post("/income/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Income added successfully");
      setAmount("");
      setSource("");
      setDate("");
      setDescription("");
      setProof(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add income (month may be locked)"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageWrapper>

        {/* HEADER */}
        <div className="page-header">
          <h1>Add Income</h1>
          <p>
            Record temple income such as donations, offerings, or sponsorships
          </p>
        </div>

        {/* INFO */}
        <div className="warning-box">
          ℹ️ Income entries are visible to villagers for transparency.
          Please ensure details are accurate.
        </div>

        {/* FEEDBACK */}
        {error && <div className="error-box">{error}</div>}
        {message && <div className="success-box">{message}</div>}

        {/* FORM */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Amount (₹)</label>
              <input
                type="number"
                placeholder="Enter income amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Source</label>
              <input
                type="text"
                placeholder="e.g. Donation, Hundi, Sponsor"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Description (optional)</label>
              <textarea
                placeholder="Any additional notes"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Proof (optional)</label>
              <input
                type="file"
                onChange={(e) => setProof(e.target.files[0])}
              />
              {proof && (
                <small className="file-hint">
                  Selected: {proof.name}
                </small>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="primary-btn w-full"
            >
              {loading ? "Submitting..." : "Submit Income"}
            </button>

          </form>
        </div>

      </PageWrapper>
    </Layout>
  );
};

export default CommitteeAddIncome;
