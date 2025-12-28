import { message } from "antd";
import { useEffect, useState } from "react";
import type { User } from "../../../Entities/User/UserEntity";
import { AdminService } from "../../../Features/Admin/User";
import { PageHeader } from "../../../Shared/Components/PageHeader";

const AdminUserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({} as User);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await AdminService.getAllUsers();
      if (Array.isArray(data)) setUsers(data);
    } catch (error) {
      console.error(error);
      message.error("Lỗi tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({ 
        username: "", 
        email: "", 
        password: "", 
        phoneNumber: "", 
        isActive: true 
    } as User); 
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setIsEditing(true);
    setFormData({
      ...user,
      password: "", 
      phoneNumber: user.phoneNumber || "", 
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      const success = await AdminService.deleteUser(id);
      if (success) {
        message.success("Đã xóa thành công!");
        loadUsers();
      } else {
        message.error("Xóa thất bại.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  
    try {
      let success = false;
      // Gọi API tương ứng
      if (isEditing) {
        success = await AdminService.updateUser(formData);
      } else {
        success = await AdminService.createUser(formData);
      }

      if (success) {
        message.success(isEditing ? "Cập nhật xong!" : "Tạo mới xong!");
        setIsModalOpen(false);
        loadUsers();
      } else {
        message.error("Thao tác thất bại.");
      }
    } catch (error) {
      message.error("Lỗi hệ thống.");
    }
  };

  const getStatusBadge = (isActive: boolean) => (
    isActive 
      ? <span className="px-3 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-full">Hoạt động</span>
      : <span className="px-3 py-1 text-xs font-bold bg-red-100 text-red-700 rounded-full">Đã khóa</span>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title="Quản lý Người dùng" subtitle="Danh sách tài khoản hệ thống" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Nút Thêm Mới */}
        <div className="flex justify-end mb-6">
            <button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2">
                + Thêm User
            </button>
        </div>

        {/* Bảng Dữ Liệu */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-blue-600">Đang tải dữ liệu...</div>
          ) : users.length === 0 ? (
            <div className="p-10 text-center text-gray-500">Danh sách trống.</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">User Info</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Liên hệ</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Trạng thái</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.userId} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{user.username}</div>
                      <div className="text-xs text-gray-400">ID: {user.userId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phoneNumber || "---"}</div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(user.isActive)}</td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button onClick={() => handleOpenEdit(user)} className="text-blue-600 hover:underline font-medium">Sửa</button>
                      <button onClick={() => handleDelete(user.userId)} className="text-red-600 hover:underline font-medium">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">{isEditing ? "Cập nhật User" : "Thêm User mới"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-gray-200 text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Username</label>
                <input 
                  type="text" 
                  required 
                  className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Email</label>
                <input 
                  type="email" 
                  required 
                  disabled={isEditing}
                  className={`w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                    Mật khẩu {isEditing && <span className="font-normal text-xs text-gray-400"></span>}
                </label>
                <input 
                  type="password" 
                  required
                  className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.password || ""} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Số điện thoại</label>
                <input 
                  type="text" 
                  className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.phoneNumber || ""}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="activeCheck"
                  className="w-5 h-5 text-blue-600 rounded"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                />
                <label htmlFor="activeCheck" className="text-sm font-medium text-gray-700 cursor-pointer">Kích hoạt tài khoản</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold">
                  {isEditing ? "Lưu lại" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserPage;