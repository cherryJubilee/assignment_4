import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config";
import prismaClient from "../../prisma/client.prisma";

const noAuthRequiredRoutes = [
  "/auth/sign-up",
  "/auth/log-in",
  "/board/1",
  "/board/2",
];

async function authenticator(req: Request, res: Response, next: NextFunction) {
  if (noAuthRequiredRoutes.includes(req.url)) return next();

  // 여권 존재 여부 검사
  const accessToken = req.headers.authorization?.split("Bearer ")[1];

  if (!accessToken) {
    console.log("401 에러 발생-1");
    return res.sendStatus(401);
  }

  // 여권 유효성 검사 (jwt.verify)
  try {
    const decodedToken = jwt.verify(accessToken, JWT_SECRET_KEY);

    if (
      !decodedToken ||
      typeof decodedToken !== "object" ||
      !decodedToken.email
    ) {
      console.log("401 에러 발생-2");
      return res.sendStatus(401);
    }

    const user = await prismaClient.user.findUnique({
      where: {
        email: decodedToken.email,
        id: decodedToken.id,
      },
    });

    if (!user) {
      console.log("405 에러 발생");
      return res.sendStatus(405);
    }

    req.user = user;
    next();
  } catch (e) {
    console.log("401 에러 발생");
    return res.sendStatus(401);
  }
}

export default authenticator;
