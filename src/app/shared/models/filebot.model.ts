export interface Filebot {
    id: string;
    newLocation: string;
    newName: string;
    originalName: string;
    unsorted: boolean;
    quality: string;
    createdBy: string;
    lastModifiedBy:string;
    createdAt: Date;
    lastModifiedAt: Date;
}