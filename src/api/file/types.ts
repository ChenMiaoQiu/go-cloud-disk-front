// 获取上传链接接口
export interface GetUploadUrlData {
    filetype: string
}

export interface GetUploadUrlRes {
    url: string
}

export interface UploadFileData {
    file: FormData
}

export interface UploadFileRes {
    url: string
}

export interface GetDowloadRes {
    dowload_url: string
}

export interface DeleteFileRes {
}

export interface RemoveFileData {
    file: string,
    name: string,
    parent: string,
}

export interface RemoveFileRes {
}

export interface AdminDeleteFileData {
    fileId: string
}

export interface AdminDeleteFileRes {
}

export interface SaveFileData {
    fileid: string
    filefolder: string
}

export interface SaveFileRes {
}

export interface FilesInfo {
    file_id: string,
    filename: string,
    filetype: string,
    size: number,
}