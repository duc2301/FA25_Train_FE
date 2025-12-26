import type { ApiResponse } from "../../Entities/ApiResponse";
import api from "../../Shared/Api/axios";
import type { User } from "../../Entities/User/UserEntity";

export const getAllUser = async () => {
    const response = await api.get("admin/AdminUser/UserGetAll");
    const data : ApiResponse<User[]> = response.data;
    console.log(response);
    return data.message;
}