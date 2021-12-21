import { FeedFilm, Torrent } from './../models/feed-film.model';
import { Pageable } from './../models/pageable.model';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Injectable({ providedIn: 'root' })
export class FeedFilmsService {
  constructor(private httpClient: HttpClient) { }

  getFilm(id: string, force?: boolean): Observable<FeedFilm> {
    let params = new HttpParams().set('force', force);
    return this.httpClient.get<FeedFilm>(environment.apiUrl + 'feed-films/' + id, { params: params });
  }


  getFilmsByPageEvent(page: PageEvent): Observable<Pageable> {
    return this.httpClient.get<Pageable>(environment.apiUrl + 'feed-films?page=' + page.pageIndex + '&size=' + page.pageSize);
  }

  getLastFilms(): Observable<FeedFilm[]> {
    return this.httpClient.get<FeedFilm[]>(environment.apiUrl + 'feed-films/last');
  }


  updateFilm(feedFilm: FeedFilm): Observable<FeedFilm> {
    return this.httpClient.put<FeedFilm>(environment.apiUrl + 'feed-films/' + feedFilm.id, feedFilm);
  }

  updateFilmTorrent(torrent: Torrent): Observable<FeedFilm> {
    return this.httpClient.put<FeedFilm>(environment.apiUrl + 'feed-films/torrents/' + torrent.torrentId, torrent);
  }

  deleteFilm(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + 'feed-films/' + id);
  }

  deleteTorrent(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + 'feed-films/torrents/' + id);
  }

  search(search: string): Observable<FeedFilm[]> {
    let params = new HttpParams().set('title', search);
    return this.httpClient.get<FeedFilm[]>(environment.apiUrl + 'feed-films/search', { params: params });
  }

  downloadTorrent(id: string): Observable<void> {
    return this.httpClient.post<void>(environment.apiUrl + 'feed-films/torrents/' + id+'?forceDownload=true', null);
  }

}
