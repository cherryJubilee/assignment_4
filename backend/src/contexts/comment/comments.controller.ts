import { Router } from "express";
import commentService from "./comments.service";

const commentController = Router();
// 댓글 생성
commentController.post("/:boardId/:postId", commentService.createComment);
// 특정 게시글의 댓글 목록 조회
commentController.get("/:boardId/:postId", commentService.getComments);
// 댓글 업데이트
commentController.put("/:commentId", commentService.updateComment);
commentController.delete("/:commentId", commentService.deleteComment);

export default commentController;
