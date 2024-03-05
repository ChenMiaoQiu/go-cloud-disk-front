import { http } from "../http";
import * as Type from "./types";

export async function GetUploadUrl(data: Type.GetUploadUrlData) {
    return await http.post<Type.GetUploadUrlRes>('/api/v1/uploadpath', true, data)
}

export async function UploadFile(data: Type.UploadFileData) {
    return await http.post<Type.UploadFileRes>('api/v1/upload', true, data)
}

export async function DownloadFile(fileid: string) {
    const url: string = 'api/v1/file/' + fileid
    return await http.get<Type.GetDowloadRes>(url, true)
}

export async function DeleteFile(fileid: string) {
    const url: string = 'api/v1/file/' + fileid
    return await http.del<Type.DeleteFileRes>(url, true)
}

export async function RemoveFile(data: Type.RemoveFileData) {
    return await http.put<Type.RemoveFileRes>('api/v1/file', true, data)
}