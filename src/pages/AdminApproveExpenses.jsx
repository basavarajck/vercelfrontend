import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import Loader from "../components/Loader";
import api from "../api/axios";
import "../styles/table.css";

const AdminApproveExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPendingExpenses = async () => {
    try {
      const res = await api.get("/admin/pending-expenses");
      setExpenses(res.data);
    } catch {
      setError("Failed to load pending expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingExpenses();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.post(`/admin/approve/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch {
      alert("Approval failed");
    }
  };

  return (
    <Layout>
      <PageWrapper>

        {/* HEADER */}
        <div className="page-header">
          <h1>Approve Expenses</h1>
          <p>Review and approve committee expense requests</p>
        </div>

        {loading && <Loader />}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && expenses.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg font-medium">
              No pending expenses 🎉
            </p>
            <p className="text-sm">
              All expense requests are approved
            </p>
          </div>
        )}

        {!loading && expenses.length > 0 && (
          <div className="table-card">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Added By</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((e) => (
                  <tr key={e._id}>
                    <td>
                      {new Date(e.date).toLocaleDateString()}
                    </td>

                    <td>
                      <span className="role-badge committee">
                        {e.category}
                      </span>
                    </td>

                    <td>
                      <strong>₹ {e.amount}</strong>
                    </td>

                    <td className="muted">
                      {e.addedBy?.name || "Committee"}
                    </td>

                    <td>
                      <button
                        onClick={() => handleApprove(e._id)}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </PageWrapper>
    </Layout>
  );
};

export default AdminApproveExpenses;
