import { Filebot } from '../models/filebot.model';
import { FeedFilm } from '../models/feed-film.model';
import { Pageable } from '../models/pageable.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilebotExecutor } from '../models/filebot-executor.model';
import { Qbittorrent } from '../models/qbittorrent.model';

@Injectable({ providedIn: 'root' })
export class FilebotExecutorService {
  constructor(private httpClient: HttpClient) { }


  getAllByPageable(page: number, pageSize: number): Observable<Pageable> {
    return this.httpClient.get<Pageable>(environment.apiUrl + 'filebot-executor?page=' + page + '&size=' + pageSize);
  }


  editFilebotExecutor(id: string, filebotExecutor: FilebotExecutor): Observable<FilebotExecutor> {
    return this.httpClient.patch<FilebotExecutor>(environment.apiUrl + 'filebot-executor/' + id, filebotExecutor);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + 'filebot-executor/' + id);
  }

  getAllFilebotExecutor(): Observable<string[]> {
    return this.httpClient.get<string[]>(environment.apiUrl + 'filebot-executor/files');
  }

  createQbittorrent(qbittorrent: Qbittorrent): Observable<Qbittorrent> {
    return this.httpClient.post<Qbittorrent>(environment.apiUrl + 'filebot-executor', qbittorrent);
  }

  manualExecution(): Observable<FilebotExecutor> {
    return this.httpClient.post<Qbittorrent>(environment.apiUrl + 'filebot-executor/execute', null);
  }
}
