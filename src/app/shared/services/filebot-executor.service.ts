import { Filebot } from '../models/filebot.model';
import { FeedFilm } from '../models/feed-film.model';
import { Pageable } from '../models/pageable.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FilebotExecutorService {
    constructor(private httpClient: HttpClient) { }


    getAllByPageable(page: number, pageSize: number): Observable<Pageable> {
        return this.httpClient.get<Pageable>(environment.apiUrl + 'filebot-executor?page=' + page + '&size=' + pageSize);
    }

}