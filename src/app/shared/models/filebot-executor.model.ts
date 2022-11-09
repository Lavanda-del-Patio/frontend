export interface FilebotExecutor {
  id: string;
  files?: string[];
  newFiles?: string[];
  path?: string;
  newPath?: string
  category?: string;
  command?: string;
  english?: boolean;
  expireAfterFourteenDays?: string;
  status?: FilebotExecutorStatus;
  log?: string;
}

export enum FilebotExecutorStatus {
  UNPROCESSED, ON_TELEGRAM, PENDING, ON_FILEBOT_EXECUTION, PROCESSED, FILES_EXISTED_IN_DESTINATION, ERROR,
  FILES_NOT_FOUND
}
