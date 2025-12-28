import { useState } from "react";
// Layout removed
import PageWrapper from "../components/PageWrapper";
import api from "../api/axios";
import "../styles/form.css";

const AdminLockMonth = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await api.post("/admin/lock-month", {
        year: Number(year),
        month: Number(month),
      });

      setMessage("Financial month locked successfully");
      setYear("");
      setMonth("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to lock month"
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
          <h1>Lock Financial Month</h1>
          <p>
            Prevent further income or expense entries for a completed month
          </p>
        </div>

        {/* WARNING */}
        <div className="warning-box">
          ⚠️ This action is <strong>irreversible</strong>.  
          Once a month is locked, committee members cannot modify
          any income or expense records for that period.
        </div>

        {/* FEEDBACK */}
        {error && (
          <div className="error-box">{error}</div>
        )}
        {message && (
          <div className="success-box">{message}</div>
        )}

        {/* FORM CARD */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                placeholder="e.g. 2025"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
              >
                <option value="">Select month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="danger-btn"
            >
              {loading ? "Locking Month..." : "Confirm & Lock Month"}
            </button>

          </form>
        </div>

      </PageWrapper>
    </>
  );
};

export default AdminLockMonth;
