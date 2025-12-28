import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import api from "../api/axios";
import "../styles/table.css";

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, role) => {
    await api.put(`/admin/users/${id}/role`, { role });
    fetchUsers();
  };

  return (
    <Layout>
      <PageWrapper>
        {/* HEADER */}
        <div className="page-header">
          <h1>Manage Users</h1>
          <p>Assign roles and manage access</p>
        </div>

        {/* TABLE CARD */}
        <div className="table-card">
          <table className="modern-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Change Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{u.name}</span>
                    </div>
                  </td>

                  <td className="muted">{u.email}</td>

                  <td>
                    <span className={`role-badge ${u.role}`}>
                      {u.role}
                    </span>
                  </td>

                  <td>
                    {u.role !== "admin" ? (
                      <select
                        className="role-select"
                        value={u.role}
                        onChange={(e) =>
                          changeRole(u._id, e.target.value)
                        }
                      >
                        <option value="villager">Villager</option>
                        <option value="committee">Committee</option>
                      </select>
                    ) : (
                      <span className="muted">Admin</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageWrapper>
    </Layout>
  );
};

export default AdminManageUsers;
