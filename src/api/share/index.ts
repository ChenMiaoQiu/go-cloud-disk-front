import { http } from "../http";
import * as Type from "./types";


export async function CreateShare(data: Type.CreateShareData) {
    return await http.post<Type.CreateShareRes>("/api/v1/share", true, data)
}

export async function GetShareInfo(data: Type.GetShareData) {
    const shareUrl = "/api/v1/share/" + data.shareid
    return await http.get<Type.GetShareRes>(shareUrl, false)
}

export async function GetAllShareInfo(data: Type.GetAllShareData) {
    return await http.get<Type.GetAllShareRes[]>("/api/v1/share", true)
}

export async function DeleteShareInfo(data: Type.DeleteShareData) {
    const shareUrl = "/api/v1/share/" + data.shareid
    return await http.del<Type.DeleteShareRes>(shareUrl, true)
}

export async function GetRankInfo(data: Type.GetRankShareData) {
    return await http.get<Type.GetRankShareRes[]>("/api/v1/rank/day", true)
}