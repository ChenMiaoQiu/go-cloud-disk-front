export interface GetStoreData {
    storeId: string
}

export interface GetStoreRes {
    maxsize: number
    currentsize: number
}

export interface AdminGetStoreData {
    userId: string
}

export interface AdminGetStoreRes {
    maxsize: number
    currentsize: number
}

export interface UpdateStoreVolumData {
    volum: number
    userid: string
}

export interface UpdateStoreVolumRes {
}