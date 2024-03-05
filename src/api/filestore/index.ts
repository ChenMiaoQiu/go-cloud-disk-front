import { http } from "../http";
import * as Type from "./types";

export async function GetFileStoreVolum(data: Type.GetStoreData) {
    const urlString: string = '/api/v1/filestore/' + data.storeId
    return await http.get<Type.GetStoreRes>(urlString, true)
}