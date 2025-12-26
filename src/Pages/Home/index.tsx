import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../Features/Auth";
import { getAllUser } from "../../Features/User";

const HomePage = () => {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const getData = await getAllUser();
      setData(getData);
    } catch (error) {
      setData("Lỗi khi tải dữ liệu");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-black/5">
      <header className="bg-white shadow-md border-b-2 border-blue-600">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">FakeBook</h1>
            <p className="text-xs text-gray-500">Welcome to your dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 bg-linear-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-4xl font-bold mb-2">Chào mừng đến FakeBook!</h2>
          <p className="text-blue-100 text-lg">
            Quản lý nội dung, người dùng và bài đăng của bạn từ một nơi duy nhất
          </p>
        </div>

        {data && (
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Kết quả tải dữ liệu:
            </h3>
            <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{data}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-600">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Tải dữ liệu
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Lấy dữ liệu mới nhất từ máy chủ
            </p>
            <button
              onClick={fetchData}
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang tải..." : "Tải dữ liệu"}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-2 border-green-200 hover:border-green-600">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Quản lý bài đăng
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Quản lý, tạo và chỉnh sửa bài đăng
            </p>
            <button
              onClick={() => navigate("/post")}
              className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Quản lý Post
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-2 border-red-200 hover:border-red-600">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.656"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Quản lý Admin User
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Quản lý tài khoản và quyền người dùng
            </p>
            <button
              onClick={() => navigate("/user")}
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Quản lý User
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 hover:border-purple-600">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Cài đặt
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Tùy chỉnh cài đặt tài khoản của bạn
            </p>
            <button
              disabled
              className="w-full px-4 py-3 bg-gray-300 text-gray-600 font-semibold rounded-lg shadow-md cursor-not-allowed opacity-60"
            >
              Sắp ra mắt
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>&copy; 2025 FakeBook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
