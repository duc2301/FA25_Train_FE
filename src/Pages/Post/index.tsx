import { message } from "antd";
import { useEffect, useState } from "react";
import type { Post } from "../../Entities/Post/PostEntity";
import type { User } from "../../Entities/User/UserEntity";
import { AdminService } from "../../Features/Admin/User";
import { PostService } from "../../Features/Post";
import { PageHeader } from "../../Shared/Components/PageHeader";

const PostPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedUserId, setSelectedUserId] = useState("");
  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState<"Public" | "Friends" | "OnlyMe">(
    "Public"
  );
  const [editingId, setEditingId] = useState<string | null>(null);

  // Helper function to get privacy badge class
  const getPrivacyBadgeClass = (level: string) => {
    if (level === "Public")
      return "px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800";
    if (level === "Friends")
      return "px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800";
    return "px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800";
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [postData, userData] = await Promise.all([
        PostService.getAllPosts(),
        AdminService.getAllUsers(),
      ]);
      setPosts(postData);
      setUsers(userData);
      if (userData.length > 0) setSelectedUserId(userData[0].userId);
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const success = await PostService.updatePost(editingId, content, privacy);
      if (success) {
        message.success("Cập nhật bài viết thành công!");
        setEditingId(null);
        setContent("");
        fetchData();
      } else {
        message.error("Cập nhật bài viết thất bại");
      }
    } else {
      const success = await PostService.createPost(
        selectedUserId,
        content,
        privacy
      );
      if (success) {
        message.success("Tạo bài viết thành công!");
      } else {
        message.error("Tạo bài viết thất bại");
      }
      setContent("");
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (globalThis.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      const success = await PostService.deletePost(id);
      if (success) {
        message.success("Xóa bài viết thành công!");
        fetchData();
      } else {
        message.error("Xóa bài viết thất bại");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Quản lý bài viết"
        subtitle="Quản lý bài viết của tất cả người dùng trong hệ thống"
      />

      <div className="max-w-6xl mx-auto px-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-blue-600 mt-4 font-semibold">
                Đang tải dữ liệu...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mb-8 p-8 bg-white rounded-xl shadow-lg border-2 border-blue-200"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">✎</span>{" "}
                {editingId ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Ô chọn User ID */}
                <div>
                  <label
                    htmlFor="user-select"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Đăng với tư cách:
                  </label>
                  <select
                    id="user-select"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    disabled={!!editingId}
                  >
                    {users.map((u) => (
                      <option key={u.userId} value={u.userId}>
                        {u.username}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="privacy-select"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Chế độ quyền riêng tư:
                  </label>
                  <select
                    id="privacy-select"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value as any)}
                  >
                    <option value="Public">🌍 Public (Công khai)</option>
                    <option value="Friends">👥 Friends (Bạn bè)</option>
                    <option value="OnlyMe">🔒 OnlyMe (Chỉ tôi)</option>
                  </select>
                </div>
              </div>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                placeholder="Nội dung bài viết..."
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {editingId ? "✓ Cập nhật bài viết" : "+ Đăng bài ngay"}
              </button>
            </form>

            {/* BẢNG DANH SÁCH */}
            {posts.length > 0 ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-200">
                <table className="w-full">
                  <thead className="bg-linear-to-r from-blue-600 to-blue-700 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Người đăng
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Nội dung
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Quyền riêng tư
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {posts.map((post, index) => (
                      <tr
                        key={post.postId}
                        className={`hover:bg-blue-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {users.find((u) => u.userId === post.userId)
                              ?.username || "Unknown"}
                          </div>
                          <div className="text-xs text-gray-500 font-mono">
                            {post.userId.substring(0, 13)}...
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-lg truncate">
                          {post.content}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={getPrivacyBadgeClass(post.privacyLevel)}
                          >
                            {post.privacyLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => {
                                setEditingId(post.postId);
                                setContent(post.content || "");
                                setPrivacy(post.privacyLevel);
                              }}
                              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors text-sm"
                            >
                              ✎ Sửa
                            </button>
                            <button
                              onClick={() => handleDelete(post.postId)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-sm"
                            >
                              ✗ Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-lg">
                <div className="text-5xl mb-4">📝</div>
                <p className="text-gray-500 text-lg font-semibold">
                  Chưa có bài viết nào.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Hãy tạo bài viết mới để bắt đầu.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostPage;
