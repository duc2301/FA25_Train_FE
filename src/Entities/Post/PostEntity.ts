export interface Post {
  postId: string;
  userId: string;
  content?: string;
  privacyLevel: "Public" | "Friends" | "OnlyMe";
  originalPostId?: string | null;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt?: string | null;
}
