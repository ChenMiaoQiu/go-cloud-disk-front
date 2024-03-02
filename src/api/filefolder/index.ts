import { http } from "../http";
import * as Type from "./types";

export async function GetAllFileInFileFolder(filefolderId: string) {
    const urlString: string = '/api/v1/filefolder/' + filefolderId + '/file'
    return await http.get<Type.GetFilesRes[]>(urlString, true)
}

export async function GetAllFileFolderInFileFolder(filefolderId: string) {
    const urlString: string = '/api/v1/filefolder/' + filefolderId + '/filefolder'
    return await http.get<Type.GetFileFoldersRes[]>(urlString, true)
}

export async function CreateFileFolder(data: Type.CreateFileFolderData) {
    return await http.post<Type.CreateFileFolderRes>('api/v1/filefolder', true, data)
}

export async function DeleteFileFolder(filefolderId: string) {
    const urlString: string = 'api/v1/filefolder/' + filefolderId
    return await http.del<Type.DeleteFIleFolderRes>(urlString, true)
}