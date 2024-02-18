import { Request, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

class LikeService {
  async getLikedPosts(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(403).send("사용자 인증 필요");
    }

    try {
      const likes = await prismaClient.like.findMany({
        where: {
          userId: userId,
        },
      });
      res.json(likes);
    } catch (e) {
      res.status(500).send("좋아요한 게시글 목록 불러오기 실패");
    }
  }

  // 좋아요
  async likePost(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(403).send("사용자 인증 필요");
    }
    const postId = Number(req.body.postId);
    if (isNaN(postId)) {
      return res.status(400).send("postId 없음");
    }

    try {
      // 좋아요 존재 여부 확인
      const existingLike = await prismaClient.like.findFirst({
        where: {
          userId,
          postId,
        },
      });

      if (existingLike) {
        // 좋아요가 이미 존재하면 삭제
        await prismaClient.like.delete({
          where: {
            id: existingLike.id,
          },
        });
        res.json({ message: "좋아요 취소" });
      } else {
        // 존재하지 않으면 새로 추가
        const like = await prismaClient.like.create({
          data: {
            userId,
            postId,
          },
        });
        res.json(like);
      }
    } catch (e) {
      res.status(500).send("좋아요 처리 실패");
    }
  }
}

const likeService = new LikeService();
export default likeService;
