import { API } from "../core/utils";

export const logIn = (FormData) => API.post("/auth/login", FormData);
