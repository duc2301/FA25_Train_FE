import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../Features/Auth";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md border-b-2 border-blue-600 mb-6">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">{title}</h1>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Trang chủ
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
};
