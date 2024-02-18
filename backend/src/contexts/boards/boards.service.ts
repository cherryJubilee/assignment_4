import { Request, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

class BoardService {
  async getPosts(req: Request, res: Response) {
    const boardId = Number(req.params.boardId);
    console.log("getPosts-boardId:", boardId);

    const posts = await prismaClient.post.findMany({
      where: {
        boardId: boardId,
      },
    });
    //console.log("getPosts:", posts);
    res.json(posts);
  }

  async getPost(req: Request, res: Response) {
    const postId = Number(req.params.postId);
    const boardId = Number(req.params.boardId);
    // postId 유효성 검사
    if (isNaN(postId)) {
      return res.status(400).send("postId 없음");
    }

    try {
      const post = await prismaClient.post.findFirst({
        where: { id: postId, boardId: boardId },
      });
      if (!post) {
        return res.status(404).send("해당하는 게시물이 없습니다");
      }

      console.log("postID: ", postId);
      console.log("getPost: ", post);
      res.json(post);
    } catch (e) {
      res.status(500).send("Server Error");
    }
  }

  async createPost(
    req: Request<any, unknown, { title: string; content: string }>,
    res: Response
  ) {
    const boardId = Number(req.params.boardId);
    console.log("boardId:", boardId);

    const authorId = req.user?.id;

    if (!authorId) {
      return res.status(403);
    }

    const { title, content } = req.body;
    try {
      const result = await prismaClient.post.create({
        data: {
          title,
          content,
          authorId: authorId,
          boardId: boardId,
        },
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).send("게시글 작성 중 오류");
    }
  }

  async deletePost(req: Request, res: Response) {
    const boardId = Number(req.params.boardId);
    const postId = Number(req.params.postId);
    // postId 유효성 검사
    if (isNaN(postId)) {
      return res.status(400).send("postId 없음");
    }

    try {
      await prismaClient.post.delete({
        where: { id: postId, boardId: boardId },
      });
      res.status(200).send("게시글 삭제 성공");
    } catch (e) {
      res.status(500).send("게시글 삭제 실패");
    }
  }

  async updatePost(
    req: Request<any, unknown, { title: string; content: string }>,
    res: Response
  ) {
    const { title, content } = req.body;
    const boardId = Number(req.params.boardId);
    const postId = Number(req.params.postId);
    // postId 유효성 검사
    if (isNaN(postId)) {
      return res.status(400).send("postId 없음");
    }

    try {
      await prismaClient.post.update({
        where: { id: postId, boardId: boardId },
        data: { title, content },
      });
      res.status(200).send("게시글 업데이트 성공");
    } catch (e) {
      res.status(500).send("error");
    }
  }
}

const boardService = new BoardService();
export default boardService;
