import { Router } from "express";
import authController from "./auth/auth.controller";
import boardController from "./boards/boards.controller";
import commentController from "./comment/comments.controller";
import likeController from "./like/likes.controller";

const controllers = Router();
controllers.use("/board", boardController);
controllers.use("/comment", commentController);
controllers.use("/like", likeController);
controllers.use("/auth", authController);

export default controllers;
