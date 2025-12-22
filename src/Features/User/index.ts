import type { ApiResponse } from "../../Entities/ApiResponse";
import api from "../../Shared/Api/axios";

export const getAllUser = async () => {
    const response = await api.get("admin/AdminUser/UserGetAll");
    const data : ApiResponse = response.data;
    console.log(response);
    return data.message;
}