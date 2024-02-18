import bodyParser from "body-parser";
import express from "express";
import controllers from "./contexts";
import authenticator from "./contexts/middlewares/auth.middleware";
import cors from "./contexts/middlewares/cors.middleware";

const app = express();
const port = 5050;
const jsonParser = bodyParser.json();

app.get("/health-check", (_, res) => {
  res.json("OK");
});

app.use(cors);
app.use(jsonParser);
app.use(authenticator);
app.use(controllers);

app.listen(port, () => {
  console.log(`${port}서버 작동 중`);
});
