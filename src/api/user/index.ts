import { http } from "../http";
import type { LoginRes, LoginData } from "./types";

export async function LoginUser(data: LoginData) {
    return await http.post<LoginRes>('/api/v1/user/login', false, data)
}

export async function GetUserInfo(userId: string) {
    const getUserPath: string = '/api/v1/user/' + userId
    return await http.get<LoginRes>(getUserPath, true)
}