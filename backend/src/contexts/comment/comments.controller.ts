import { Router } from "express";
import commentService from "./comments.service";

const commentController = Router();
commentController.post("/", commentService.createComment);
commentController.post("/", commentService.getComments);
commentController.post("/", commentService.updateComment);
commentController.post("/", commentService.deleteComment);

export default commentController;
