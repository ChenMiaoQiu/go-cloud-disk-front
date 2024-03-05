import { http } from "../http";
import * as Type from "./types";


export async function CreateShare(data: Type.CreateShareData) {
    return await http.post<Type.CreateShareRes>("/api/v1/share", true, data)
}

export async function GetShareInfo(data: Type.GetShareData) {
    const shareUrl = "/api/v1/share/" + data.shareid
    return await http.get<Type.GetShareRes>(shareUrl, false)
}