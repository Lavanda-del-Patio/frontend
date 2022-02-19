export interface FilebotExecutor {
    id: string;
    filesName?: string[];
    newFilesName: string[];
    folderPath: string;
    parentFolderPath: string
    newParentFolderPath: string;
    command: string;
    expireAfterFourteenDays: string;
    status: FilebotExecutorStatus;
}

export enum FilebotExecutorStatus {
    UNPROCESSED, PROCESSING, PROCESSED, PROCESSED_EXISTED, ERROR, FILES_NOT_FOUND
}
