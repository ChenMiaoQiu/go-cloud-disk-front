// 登录接口
export interface LoginData {
    username: string,
    password: string
}

export interface LoginRes {
    token: string,
    id: string,
    username: string,
    nickname: string,
}

