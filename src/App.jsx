import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import VillagerDashboard from "./pages/VillagerDashboard";
import CommitteeDashboard from "./pages/CommitteeDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import VillagerIncomeExpense from "./pages/VillagerIncomeExpense";
import CommitteeAddIncome from "./pages/CommitteeAddIncome";
import CommitteeAddExpense from "./pages/CommitteeAddExpense";
import AdminApproveExpenses from "./pages/AdminApproveExpenses";
import AdminLockMonth from "./pages/AdminLockMonth";
import AdminMonthlyReports from "./pages/AdminMonthlyReports";
import VillagerComplaints from "./pages/VillagerComplaints";
import ManageComplaints from "./pages/ManageComplaints";
import VillagerAnnouncements from "./pages/VillagerAnnouncements";
import ManageAnnouncements from "./pages/ManageAnnouncements";
import VillagerEvents from "./pages/VillagerEvents";
import ManageEvents from "./pages/ManageEvents";
import VillagerGallery from "./pages/VillagerGallery";
import ManageGallery from "./pages/ManageGallery";
import AdminAuditLogs from "./pages/AdminAuditLogs";
import AdminManageUsers from "./pages/AdminManageUsers";
import LandingPage from "./pages/LandingPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />

        {/* Villager */}
        <Route
          path="/villager"
          element={
            <ProtectedRoute allowedRoles={["villager"]}>
              <VillagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/villager/income-expense"
          element={
            <ProtectedRoute allowedRoles={["villager"]}>
              <VillagerIncomeExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/villager/complaints"
          element={
            <ProtectedRoute allowedRoles={["villager"]}>
              <VillagerComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/villager/announcements"
          element={
            <ProtectedRoute allowedRoles={["villager"]}>
              <VillagerAnnouncements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/villager/events"
          element={
            <ProtectedRoute allowedRoles={["villager"]}>
              <VillagerEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/villager/gallery"
          element={
            <ProtectedRoute allowedRoles={["villager"]}>
              <VillagerGallery />
            </ProtectedRoute>
          }
        />

        {/* Committee */}
        <Route
          path="/committee"
          element={
            <ProtectedRoute allowedRoles={["committee"]}>
              <CommitteeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/committee/income"
          element={
            <ProtectedRoute allowedRoles={["committee", "admin"]}>
              <CommitteeAddIncome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/committee/expense"
          element={
            <ProtectedRoute allowedRoles={["committee", "admin"]}>
              <CommitteeAddExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/committee/complaints"
          element={
            <ProtectedRoute allowedRoles={["committee", "admin"]}>
              <ManageComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/committee/announcements"
          element={
            <ProtectedRoute allowedRoles={["committee", "admin"]}>
              <ManageAnnouncements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/committee/events"
          element={
            <ProtectedRoute allowedRoles={["committee", "admin"]}>
              <ManageEvents />
            </ProtectedRoute>
          }
        />
        <Route
  path="/committee/gallery"
  element={
    <ProtectedRoute allowedRoles={["committee", "admin"]}>
      <ManageGallery />
    </ProtectedRoute>
  }
/>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/expenses"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminApproveExpenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lock"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLockMonth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminMonthlyReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/activity-logs"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminAuditLogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminManageUsers />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
