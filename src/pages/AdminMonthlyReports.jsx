import { useState } from "react";
// Layout removed
import PageWrapper from "../components/PageWrapper";
import api from "../api/axios";
import "../styles/form.css";
import "../styles/report.css";

const AdminMonthlyReports = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = async (e) => {
    e.preventDefault();
    setError("");
    setReport(null);
    setLoading(true);

    try {
      const res = await api.get(
        `/reports/monthly?year=${year}&month=${month}`
      );
      setReport(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch report"
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const res = await api.get(
        `/reports/monthly/pdf?year=${year}&month=${month}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `temple-report-${month}-${year}.pdf`;
      link.click();
    } catch {
      alert("Failed to download PDF");
    }
  };

  return (
    <>
      <PageWrapper>

        {/* HEADER */}
        <div className="page-header">
          <h1>Monthly Financial Report</h1>
          <p>Official income & expense summary</p>
        </div>

        {/* FILTER FORM */}
        <div className="form-card">
          <form onSubmit={fetchReport}>
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
              className="primary-btn"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Report"}
            </button>
          </form>
        </div>

        {/* ERROR */}
        {error && (
          <div className="error-box">{error}</div>
        )}

        {/* REPORT SUMMARY */}
        {report && (
          <div className="report-card">
            <h2>Report Summary</h2>

            <div className="report-grid">
              <div className="report-item income">
                <span>Total Income</span>
                <strong>₹ {report.income.total}</strong>
              </div>

              <div className="report-item expense">
                <span>Total Expense</span>
                <strong>₹ {report.expense.total}</strong>
              </div>

              <div className="report-item surplus">
                <span>Surplus / Deficit</span>
                <strong>₹ {report.surplus}</strong>
              </div>
            </div>

            <button
              onClick={downloadPDF}
              className="download-btn"
            >
              Download Official PDF
            </button>
          </div>
        )}

      </PageWrapper>
    </>
  );
};

export default AdminMonthlyReports;
