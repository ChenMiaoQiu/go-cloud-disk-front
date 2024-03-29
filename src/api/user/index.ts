import { http } from "../http";
import type { LoginRes, LoginData, SearchUserData, SearchUserRes, ChangeUserAuthData, ChangeUserAuthRes, GetConfirmEmailData, GetConfirmEmailRes, RegisterData, RegisterRes } from "./types";

export async function LoginUser(data: LoginData) {
    return await http.post<LoginRes>('/api/v1/user/login', false, data)
}

export async function GetUserInfo(userId: string) {
    const getUserPath: string = '/api/v1/user/' + userId
    return await http.get<LoginRes>(getUserPath, true)
}

export async function SearchUser(data: SearchUserData) {
    return await http.post<SearchUserRes[]>('/api/v1/admin/user', true, data)
}

export async function ChangeUserAuth(data: ChangeUserAuthData) {
    return await http.put<ChangeUserAuthRes>('/api/v1/admin/user', true, data)
}

export async function GetConfirmEmail(data: GetConfirmEmailData) {
    return await http.post<GetConfirmEmailRes>('/api/v1/user/email', false, data)
}

export async function RegisterUser(data: RegisterData) {
    return await http.post<RegisterRes>('/api/v1/user/register', false, data)
}