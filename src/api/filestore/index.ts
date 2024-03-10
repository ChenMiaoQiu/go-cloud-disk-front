import { http } from "../http";
import * as Type from "./types";

export async function GetFileStoreVolum(data: Type.GetStoreData) {
    const urlString: string = '/api/v1/filestore/' + data.storeId
    return await http.get<Type.GetStoreRes>(urlString, true)
}

export async function AdminGetFileStoreVolum(data: Type.AdminGetStoreData) {
    const urlString: string = '/api/v1/admin/filestore/' + data.userId
    return await http.get<Type.AdminGetStoreRes>(urlString, true)
}

export async function UpdateFileStoreVolum(data: Type.UpdateStoreVolumData) {
    const urlString: string = '/api/v1/admin/filestore'
    return await http.put<Type.UpdateStoreVolumRes>(urlString, true, data)
}