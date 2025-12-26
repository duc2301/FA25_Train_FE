import { Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/Home";
import UserPage from "../../Pages/User";
import PostPage from "../../Pages/Post";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />      
      <Route path="/user" element={<UserPage />} />      
      <Route path="/post" element={<PostPage />} />
    </Routes>
  );
};
