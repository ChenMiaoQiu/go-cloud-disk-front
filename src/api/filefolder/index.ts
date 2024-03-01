import { http } from "../http";
import * as Type from "./types";

export async function GetAllFileInFileFolder(filefolderId: string) {
    const urlString: string = '/api/v1/filefolder/' + filefolderId + '/file'
    return await http.get<Type.GetFilesRes[]>(urlString, true)
}