export interface GetFilesRes {
    file_id: string,
    filename: string,
    filetype: string,
    size: number,
}

export interface GetFileFoldersRes {
    filefolder_id: string
    name: string
    filetype: string
    parent: string
    size: number
}

export interface FilesInfo {
    file_id: string,
    filename: string,
    filetype: string,
    size: number,
}

export interface CreateFileFolderData {
    parent: string,
    name: string,
}

export interface CreateFileFolderRes {
    filefolder_id: string
    name: string
    filetype: string
    parent: string
    size: number
}

export interface DeleteFIleFolderRes {

}

export function ConverFilefolderInfoToFileInfo(filefolder: GetFileFoldersRes): FilesInfo {
    return {
        file_id: filefolder.filefolder_id,
        filename: filefolder.name,
        filetype: filefolder.filetype,
        size: filefolder.size
    }
}
