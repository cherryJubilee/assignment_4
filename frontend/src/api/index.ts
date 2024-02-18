import axios from "axios";

export const coreClient = axios.create({
  baseURL: "http://localhost:5050",
});

// const API = { auth, posts };

export default coreClient;
