import type { ApiResponse } from "../../../Entities/ApiResponse";
import type { User } from "../../../Entities/User/UserEntity";
import api from "../../../Shared/Api/axios";

export const AdminService = {
  // 1. GET: /api/admin/AdminUser/UserGetAll
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get("admin/AdminUser/UserGetAll");
    const data: ApiResponse<User[]> = response.data;
    return data.isSuccess ? data.result : [];
  },

  // 2. GET: /api/admin/AdminUser/UserGetByID{id}
  getUserById: async (id: string): Promise<User | null> => {
    const response = await api.get(`admin/AdminUser/UserGetByID${id}`);
    const data: ApiResponse<User> = response.data;
    return data.isSuccess ? data.result : null;
  },

  // 3. POST: /api/admin/AdminUser/UserCreate
  createUser: async (userData: any) => {
    const response = await api.post("admin/AdminUser/UserCreate", userData);
    const data: ApiResponse<null> = response.data;
    return data.isSuccess;
  },

  // 4. PUT: /api/admin/AdminUser/UserUpdate
  updateUser: async (userData: any) => {
    const response = await api.put("admin/AdminUser/UserUpdate", userData);
    const data: ApiResponse<null> = response.data;
    return data.isSuccess;
  },

  // 5. DELETE: /api/admin/AdminUser/UserDelete/{id}
  deleteUser: async (id: string) => {
    const response = await api.delete(`admin/AdminUser/UserDelete/${id}`);
    const data: ApiResponse<null> = response.data;
    return data.isSuccess;
  },
};
