import { Router } from "express";
import likeService from "./likes.service";

const likeController = Router();
likeController.get("/", likeService.getLikedPosts);
likeController.post("/like", likeService.likePost);
likeController.post("/unlike", likeService.unlikePost);

export default likeController;
