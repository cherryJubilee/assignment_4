import { coreClient } from ".";
import { Post } from "../types/Post.type";

export async function getPosts(boardId: number) {
  const response = await coreClient.get(`/board/${boardId}`);
  return response.data as Post[];
}

export async function getPost(boardId: number, postId: number) {
  const response = await coreClient.get(`/board/${boardId}/${postId}`);
  return response.data as Post;
}

export async function createPost(post: { title: string; content: string }) {
  const response = await coreClient.post("/api/post", post);
  return response.data as Post;
}

export async function deletePost(postId: number) {
  await coreClient.delete(`/api/post/${postId}`);
}

export async function updatePost(
  postId: number,
  post: { title: string; content: string }
) {
  const response = await coreClient.put(`/api/post/${postId}`, post);
  return response.data as Post;
}

const posts = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
};

export default posts;
