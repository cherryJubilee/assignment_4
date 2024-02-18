import { Router } from "express";
import likeService from "./likes.service";

const likeController = Router();
likeController.get("/likes", likeService.getLikedPosts);
likeController.post("/:postId/like", likeService.likePost);

export default likeController;
