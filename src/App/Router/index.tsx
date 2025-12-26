import { Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/Home";
import LoginPage from "../../Pages/Login";
import PostPage from "../../Pages/Post";
import UserPage from "../../Pages/User";
import { ProtectedRoute } from "../ProtectedRoute";

export const AppRoutes = () => {
  return (
    <ProtectedRoute>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/post" element={<PostPage />} />

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </ProtectedRoute>
  );
};
