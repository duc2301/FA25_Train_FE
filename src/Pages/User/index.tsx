import { useEffect, useState } from "react";
import { AdminService } from "../../Features/Admin/User";
import type { User } from "../../Entities/User/UserEntity";

const UserPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Quản lý User</h1>
            
            {loading ? (
                <p className="text-blue-500 animate-pulse">Đang tải dữ liệu người dùng...</p>
            ) : users.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">ID</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Username</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Email</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Số Điện Thoại</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Hoạt Động</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Lần Cuối login</th>
                                
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.userId} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-[100px]">{user.userId}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.username}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{user.phoneNumber || "N/A"}</td>
                                    <td className="px-4 py-3 text-sm">
                                        {user.isActive ? (
                                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Hoạt động</span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Không hoạt động</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Chưa đăng nhập"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Hệ thống chưa có người dùng nào.</p>
                </div>
            )}
        </div>
    );
};

export default UserPage;