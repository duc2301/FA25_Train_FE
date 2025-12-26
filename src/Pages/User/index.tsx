import { useEffect, useState } from "react";
import type { User } from "../../Entities/User/UserEntity";
import { AdminService } from "../../Features/Admin/User";
import { PageHeader } from "../../Shared/Components/PageHeader";

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getStatusBadgeClass = (isActive: boolean): string => {
    if (isActive) {
      return "px-3 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full";
    }
    return "px-3 py-1 text-xs font-bold bg-red-100 text-red-800 rounded-full";
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await AdminService.getAllUsers();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-blue-600 mt-4 font-semibold">
              Đang tải dữ liệu người dùng...
            </p>
          </div>
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-lg shadow-lg">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-gray-500 text-lg font-semibold">
            Hệ thống chưa có người dùng nào.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Hãy tạo người dùng mới để bắt đầu quản lý.
          </p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-linear-to-r from-blue-600 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Username
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Số Điện Thoại
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Hoạt Động
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Lần Cuối login
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr
                key={user.userId}
                className={`hover:bg-blue-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-32">
                  {user.userId}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.phoneNumber || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={getStatusBadgeClass(user.isActive)}>
                    {user.isActive ? "✓ Hoạt động" : "✗ Tạm dừng"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleString("vi-VN")
                    : "Chưa đăng nhập"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Quản lý User"
        subtitle="Quản lý thông tin người dùng trong hệ thống"
      />

      <div className="max-w-7xl mx-auto px-6">{renderContent()}</div>
    </div>
  );
};

export default UserPage;
