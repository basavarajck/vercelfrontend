import { useState } from "react";
// Layout removed
import PageWrapper from "../components/PageWrapper";
import api from "../api/axios";
import "../styles/form.css";

const CommitteeAddExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
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
      formData.append("category", category);
      formData.append("date", date);
      formData.append("description", description);
      if (proof) formData.append("proof", proof);

      await api.post("/expense/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(
        "Expense submitted successfully. Awaiting admin approval."
      );
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
      setProof(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add expense (month may be locked)"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageWrapper>

        {/* HEADER */}
        <div className="page-header">
          <h1>Add Expense</h1>
          <p>
            Submit a new expense entry with supporting bill proof
          </p>
        </div>

        {/* INFO */}
        <div className="warning-box">
          ℹ️ All expenses require admin approval before they
          appear in public records.
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
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                placeholder="e.g. Festival, Maintenance"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                placeholder="Brief description of expense"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Bill / Proof (Photo or PDF)</label>
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
              {loading ? "Submitting..." : "Submit Expense"}
            </button>

          </form>
        </div>

      </PageWrapper>
    </>
  );
};

export default CommitteeAddExpense;
