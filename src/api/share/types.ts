export interface CreateShareData {
    fileId: string
    title: string
}

export interface CreateShareRes {
    shareid: string
}

export interface GetShareData {
    shareid: string
}

export interface GetShareRes {
    shareid: string
    title: string
    sharefileid: string
    owner: string
    sharetime: string
    view: number
    downloadurl: string
    filename: string
}

export interface GetAllShareData {
}

export interface GetAllShareRes {
    shareid: string
    title: string
    sharefileid: string
    owner: string
    sharetime: string
    view: number
    downloadurl: string
    filename: string
}

export interface DeleteShareData {
    shareid: string
}

export interface DeleteShareRes {
}

export interface GetRankShareData {
}

export interface GetRankShareRes {
    shareid: string
    title: string
    sharefileid: string
    owner: string
    sharetime: string
    view: number
    downloadurl: string
    filename: string
}