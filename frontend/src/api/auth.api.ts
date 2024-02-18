import { coreClient } from ".";

async function signUp(dto: { id: string; email: string; password: string }) {
  const response = await coreClient.post("/auth/sign-up", dto);
  const data = response.data;
  const accessToken = data.accessToken;

  if (!accessToken) throw new Error("회원가입에 실패하였습니다~!");

  coreClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  return accessToken;
}

async function logIn(dto: { email: string; password: string }) {
  const response = await coreClient.post("/auth/log-in", dto);
  const accessToken = response.data;
  if (!accessToken) throw new Error("로그인에 실패하였습니다~!");

  coreClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  return accessToken;
}

const auth = {
  signUp,
  logIn,
};

export default auth;
