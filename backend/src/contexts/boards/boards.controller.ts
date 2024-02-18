import { Router } from "express";
import boardService from "./boards.service";

const boardController = Router();
boardController.get("/:boardId", boardService.getPosts);
boardController.get("/:boardId/:postId", boardService.getPost);
boardController.post("/:boardId", boardService.createPost);
boardController.delete("/:boardId/:postId", boardService.deletePost);
boardController.put("/:boardId/:postId", boardService.updatePost);

export default boardController;
