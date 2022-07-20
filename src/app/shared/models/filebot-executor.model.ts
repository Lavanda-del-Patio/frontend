export interface FilebotExecutor {
    id: string;
    files?: string[];
    newFiles?: string[];
    path?: string;
    newPath?: string
    category?: string;
    command?: string;
    englisth?: boolean;
    expireAfterFourteenDays?: string;
    status?: FilebotExecutorStatus;
}

export enum FilebotExecutorStatus {
    UNPROCESSED, PROCESSING, PROCESSED, PROCESSED_EXISTED, ERROR, FILES_NOT_FOUND
}
