import { environment } from './../../../environments/environment';
import { Transcode } from './../models/transcode-selected.model';
import { TranscodeApi } from './../models/transcode.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranscodeMedia } from '../models/transcodemedia.model';

@Injectable({ providedIn: 'root' })
export class MediaService {

    constructor(private httpClient: HttpClient) { }


    getAllMediaByPageable(page: number, size: number): Observable<any> {
        return this.httpClient.get<any>(environment.apiUrl + 'media' + '?page=' + String(page) + '&size=' + size);
    }

    getTranscodes(flatMediaId: string): Observable<TranscodeMedia[]> {
        return this.httpClient.get<TranscodeMedia[]>(environment.apiUrl + 'media/' + flatMediaId + '/transcodes');
    }

    getTranscodesByType(type: string): Observable<TranscodeApi> {
        return this.httpClient.get<TranscodeApi>(environment.apiUrl + 'transcodes/' + type);
    }

    createTranscodes(flatMediId: string, transcodes: Transcode[]): Observable<any> {
        return this.httpClient.post(environment.apiUrl + 'transcodes/' + flatMediId, transcodes);
    }

    downloadById(id: string) {
        const url = 'https://files.lavandadelpatio.es/' + 'files' + '/' + id;
        //window.open(url);
    }

    watchById(id: string): string {
        return 'https://files.lavandadelpatio.es/' + 'files/player/' + id;
    }

    deleteFlat(id: string): Observable<any> {
        const url = environment.apiUrl + 'media/' + id;
        return this.httpClient.delete(url);
    }
    deleteTranscode(id: string): Observable<any> {
        const url = environment.apiUrl + 'media/transcodes/' + id;
        return this.httpClient.delete(url);
    }
}
