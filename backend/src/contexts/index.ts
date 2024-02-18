import { Router } from "express";
import authController from "./auth/auth.controller";
import postController from "./boards/boards.controller";
import likeController from "./like/likes.controller";

const controllers = Router();
controllers.use("/board", postController);
controllers.use("/like", likeController);
controllers.use("/auth", authController);

export default controllers;
