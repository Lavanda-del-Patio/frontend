import { Pageable } from '../models/pageable.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilebotExecutor } from '../models/filebot-executor.model';
import { Qbittorrent } from '../models/qbittorrent.model';

@Injectable({ providedIn: 'root' })
export class FilebotExecutorService {
  constructor(private httpClient: HttpClient) { }


  getAllByPageable(page: number, pageSize: number, path?: string, status?: string): Observable<Pageable> {
    let params = new HttpParams();
    // ?page = ' + page + ' & size=' + pageSize + ' & path=' + path + ' & status=' + status

    params = params.set('pageSize', pageSize);
    params = params.set('page', page);

    if (path) {
      params = params.set('path', path);
    }
    if (status) {
      params = params.set('status', status);
    }
    return this.httpClient.get<Pageable>(environment.apiUrl + 'filebot-executor', { params });
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

  manualExecution(): Observable<Qbittorrent> {
    return this.httpClient.post<Qbittorrent>(environment.apiUrl + 'filebot-executor/execute', null);
  }

  manualExecutionMovie(): Observable<Qbittorrent> {
    return this.httpClient.post<Qbittorrent>(environment.apiUrl + 'filebot-executor/execute/movie', null);
  }
  manualExecutionShow(): Observable<Qbittorrent> {
    return this.httpClient.post<Qbittorrent>(environment.apiUrl + 'filebot-executor/execute/show', null);
  }
  downloadLog(data: string) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
