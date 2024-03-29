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
    filefolder: string,
    filestore: string,
    status: string
}

// 搜索用户接口
export interface SearchUserData {
    uuid: string
    nickname: string
    status: string
}

export interface SearchUserRes {
    id: string
    username: string
    nickname: string
    status: string
}

export interface ChangeUserAuthData {
    userid: string
    status: string
}

export interface ChangeUserAuthRes {
}

export interface GetConfirmEmailData {
    email: string
}

export interface GetConfirmEmailRes {
}

export interface RegisterData {
    username: string
    nickname: string
    password: string
    code: string
}

export interface RegisterRes {
    token: string,
    id: string,
    username: string,
    nickname: string,
    filefolder: string,
    filestore: string,
    status: string
}
