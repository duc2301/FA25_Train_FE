import { Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/Home";
import LoginPage from "../../Pages/Login";
import PostPage from "../../Pages/Post";
import AdminUserPage from "../../Pages/Admin/User";
import { ProtectedRoute } from "../ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/user"
        element={
          <ProtectedRoute>
            <AdminUserPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post"
        element={
          <ProtectedRoute>
            <PostPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
};
