import { Request, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

class CommentService {
  async createComment(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const { content } = req.body;
      if (!req.user) {
        return res.status(401);
      }
      const authorId = req.user?.id; // 여기서 req.user는 undefined가 아님을 보장 -> data쪽 에러 사라짐

      const newComment = await prismaClient.comment.create({
        data: {
          content: content,
          authorId: authorId,
          postId: postId, // 댓글이 연결될 게시글 ID
        },
      });
      res.status(201).json(newComment);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getComments(req: Request, res: Response) {
    const postId = Number(req.params.postId);

    try {
      const commnets = await prismaClient.comment.findMany({
        where: {
          postId: postId,
        },
      });

      res.json(commnets);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  // 댓글 업데이트 및 삭제 -> 작성자인지 확인 필요
  async updateComment(req: Request, res: Response) {
    try {
      const commentId = Number(req.params.commentId);
      const { content } = req.body;

      const updatedComment = await prismaClient.comment.update({
        where: { id: commentId },
        data: { content: content },
      });

      res.status(200).json(updatedComment);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const commentId = Number(req.params.commentId);

      // 댓글 삭제
      await prismaClient.comment.delete({
        where: { id: commentId },
      });

      res.status(200).json("댓글삭제 완료");
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

const commentService = new CommentService();
export default commentService;
