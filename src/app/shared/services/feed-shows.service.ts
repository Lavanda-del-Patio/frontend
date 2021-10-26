import { PageEvent } from '@angular/material/paginator';
import { Pageable } from './../models/pageable.model';
import { FeedShow } from './../models/feed-show.model';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FeedShowsService {
    constructor(private httpClient: HttpClient) { }



    getById(idShow: string): Observable<FeedShow> {
        return this.httpClient.get<FeedShow>(environment.apiUrl + 'feed-shows/' + idShow);
    }

    getShowsByPageEvent(page: PageEvent): Observable<Pageable> {
      return this.httpClient.get<Pageable>(environment.apiUrl + 'feed-shows?page=' + page.pageIndex + '&size=' + page.pageSize);
    }

    getLastShows(): Observable<FeedShow[]> {
        return this.httpClient.get<FeedShow[]>(environment.apiUrl + 'feed-shows/last');
    }

    addShow(feedShow:FeedShow): Observable<FeedShow> {
        return this.httpClient.post<FeedShow>(environment.apiUrl + 'feed-shows',feedShow);
    }
}
