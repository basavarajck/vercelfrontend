import { useEffect, useState } from "react";
// Layout removed
import PageWrapper from "../components/PageWrapper";
import Loader from "../components/Loader";
import api from "../api/axios";
import "../styles/incomeExpense.css";

const VillagerIncomeExpense = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await api.get("/income");
        const expenseRes = await api.get("/expense");

        setIncome(incomeRes.data);
        setExpense(expenseRes.data);
      } catch (err) {
        console.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageWrapper>
      <h1 className="text-2xl font-semibold mb-6">
        Temple Income & Expenses
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <>
          {/* INCOME TABLE */}
          <h2 className="text-xl font-medium mb-2">Income</h2>
          <table className="w-full border rounded-lg overflow-hidden mb-8">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Source</th>
                <th className="border p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {income.map((i) => (
                <tr key={i._id} className="hover:bg-gray-50 transition">
                  <td className="border p-2">
                    {new Date(i.date).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{i.source}</td>
                  <td className="border p-2">₹ {i.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EXPENSE TABLE */}
          <h2 className="text-xl font-medium mb-2">Expenses</h2>
          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {expense.map((e) => (
                <tr key={e._id} className="hover:bg-gray-50 transition">
                  <td className="border p-2">
                    {new Date(e.date).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{e.category}</td>
                  <td className="border p-2">₹ {e.amount}</td>
                  <td className="border p-2">
                    {e.approved ? "Approved" : "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      </PageWrapper>
    </>
  );
};

export default VillagerIncomeExpense;
