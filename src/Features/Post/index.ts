import type { ApiResponse } from "../../Entities/ApiResponse";
import type { Post } from "../../Entities/Post/PostEntity";
import api from "../../Shared/Api/axios";

export const PostService = {
  // 1. GET: /api/Posts/PostGetAll
  getAllPosts: async (): Promise<Post[]> => {
    const response = await api.get("Posts/PostGetAll");
    const data: ApiResponse<Post[]> = response.data;
    return data.isSuccess ? data.result : [];
  },

  // 2. GET: /api/Posts/PostGetByID{id}
  getPostById: async (id: string): Promise<Post | null> => {
    const response = await api.get(`Posts/PostGetByID${id}`);
    const data: ApiResponse<Post> = response.data;
    return data.isSuccess ? data.result : null;
  },

  // 3. POST: /api/Posts/PostCreate
  createPost: async (userId: string, content: string, privacyLevel: string) => {
    const payload = { userId, content, privacyLevel };
    const response = await api.post("Posts/PostCreate", payload);
    const data: ApiResponse<null> = response.data;
    return data.isSuccess;
  },

  // 4. PUT: /api/Posts/PostUpdate{id}
  updatePost: async (id: string, content: string, privacyLevel: string) => {
    const payload = {
      postId: id,
      content: content,
      privacyLevel: privacyLevel,
    };

    const response = await api.put(`Posts/PostUpdate${id}`, payload);
    const data: ApiResponse<null> = response.data;
    return data.isSuccess;
  },

  // 5. DELETE: /api/Posts/PostDelete{id}
  deletePost: async (id: string) => {
    const response = await api.delete(`Posts/PostDelete${id}`);
    const data: ApiResponse<null> = response.data;
    return data.isSuccess;
  },
};
