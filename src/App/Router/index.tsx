import { Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/Home";
import UserPage from "../../Pages/User";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />      
      <Route path="/user" element={<UserPage />} />      
    </Routes>
  );
};
