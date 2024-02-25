import { http } from "../http";
import type { GetUploadUrlData, GetUploadUrlRes } from "./types";

export async function GetUploadUrl(data: GetUploadUrlData) {
    return await http.post<GetUploadUrlRes>('/api/v1/uploadpath', true, data)
}