import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config";
import prismaClient from "../../prisma/client.prisma";

class AuthService {
  async SignUp(req: Request, res: Response) {
    const { email, password } = req.body;

    // db에서 이메일 불러와서 중복된 이메일인지 확인
    const existEmail = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existEmail) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }

    // 비밀번호 암호화 (bcrypt 사용)
    const encryptedPassword = await bcrypt.hash(password, 12);
    // 암호화 한 비밀번호 user테이블에 저장
    await prismaClient.user.create({
      data: {
        email: email,
        password: encryptedPassword,
      },
    });
    console.log("회원가입!!");
    res.json({ message: "회원가입이 완료되었습니다." });
  }

  async LogIn(req: Request, res: Response) {
    const { email, password } = req.body;

    // 로그인 시 입력받은 비밀번호를 암호화해서 db에 있는 암호화된 비밀번호와 일치하는지 확인 해야돼!
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      console.log("404 에러 발생");

      return res
        .status(404)
        .json({ message: "존재하지 않은 사용자입니다. 회원가입 해주세요" });
    }

    try {
      const isVerified = await bcrypt.compare(password, user.password);

      // 비밀번호 일치하지 않은 경우
      if (!isVerified) {
        console.log("401 에러 발생");
        return res
          .status(401)
          .json({ message: "비밀번호가 일치하지 않습니다." });
      }
    } catch (e) {
      console.log("401 에러 발생");
      return res.sendStatus(401);
    }

    const accessToken = jwt.sign(
      { email: user.email, sub: user.id },
      JWT_SECRET_KEY
    );
    console.log("토큰 발행 성공: ", accessToken);
    res.json(accessToken);
  }
}

const authService = new AuthService();
export default authService;
