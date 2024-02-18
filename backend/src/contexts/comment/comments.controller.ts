import { Router } from "express";
import commentService from "./comments.service";

const commentController = Router();
commentController.post("/:boardId/:postId", commentService.createComment);
commentController.get("/:boardId/:postId", commentService.getComments);
commentController.put("/:commentId", commentService.updateComment);
commentController.delete("/:commentId", commentService.deleteComment);

export default commentController;
