import { useEffect, useState } from "react";
import { PostService } from "../../Features/Post";
import { AdminService } from "../../Features/Admin/User";
import type { Post } from "../../Entities/Post/PostEntity";
import type { User } from "../../Entities/User/UserEntity";

const PostPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    const [selectedUserId, setSelectedUserId] = useState("");
    const [content, setContent] = useState("");
    const [privacy, setPrivacy] = useState<'Public' | 'Friends' | 'OnlyMe'>('Public');
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [postData, userData] = await Promise.all([
                PostService.getAllPosts(),
                AdminService.getAllUsers() 
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

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            const success = await PostService.updatePost(editingId, content, privacy);
            if (success) {
                alert("Cập nhật thành công!");
                setEditingId(null);
                setContent("");
                fetchData();
            }
        } else {
            await PostService.createPost(selectedUserId, content, privacy);
            setContent("");
            fetchData();
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Xóa bài này?")) {
            if (await PostService.deletePost(id)) fetchData();
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Quản lý bài viết đa người dùng</h1>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mb-8 p-6 border rounded-xl bg-white shadow-sm">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Ô chọn User ID */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Đăng với tư cách (User ID):</label>
                        <select 
                            className="w-full p-2 border rounded"
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            disabled={!!editingId}
                        >
                            {users.map(u => (
                                <option key={u.userId} value={u.userId}>{u.username} ({u.userId.substring(0,8)}...)</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Chế độ:</label>
                        <select className="w-full p-2 border rounded" value={privacy} onChange={(e) => setPrivacy(e.target.value as any)}>
                            <option value="Public">Public</option>
                            <option value="Friends">Friends</option>
                            <option value="OnlyMe">OnlyMe</option>
                        </select>
                    </div>
                </div>
                <textarea 
                    className="w-full p-3 border rounded mb-4" 
                    placeholder="Nội dung bài viết..." 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">
                    {editingId ? "Cập nhật bài viết" : "Đăng bài ngay"}
                </button>
            </form>

            {/* BẢNG DANH SÁCH */}
            <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4">Người đăng</th>
                            <th className="p-4">Nội dung</th>
                            <th className="p-4">Quyền</th>
                            <th className="p-4 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            
                            <tr key={post.postId} className="border-b hover:bg-gray-50">
                                <td className="p-4 text-xs text-gray-500 font-mono">{post.userId.substring(0,13)}...</td>
                                <td className="p-4 font-medium">{post.content}</td>
                                <td className="p-4"><span className="text-xs bg-gray-100 px-2 py-1 rounded">{post.privacyLevel}</span></td>
                                <td className="p-4 text-right space-x-2">
                                    <button onClick={() => {setEditingId(post.postId); setContent(post.content || ""); setPrivacy(post.privacyLevel);}} className="text-blue-600">Sửa</button>
                                    <button onClick={() => handleDelete(post.postId)} className="text-red-600">Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostPage;