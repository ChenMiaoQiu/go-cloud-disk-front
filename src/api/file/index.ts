import { http } from "../http";
import * as Type from "./types";

export async function GetUploadUrl(data: Type.GetUploadUrlData) {
    return await http.post<Type.GetUploadUrlRes>('/api/v1/uploadpath', true, data)
}

export async function UploadFile(data: Type.UploadFileData) {
    return await http.post<Type.UploadFileRes>('api/v1/upload', true, data)
}