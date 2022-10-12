import { Filebot } from '../models/filebot.model';
import { FeedFilm } from '../models/feed-film.model';
import { Pageable } from '../models/pageable.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilebotExecutor } from '../models/filebot-executor.model';

@Injectable({ providedIn: 'root' })
export class FilebotExecutorService {
  constructor(private httpClient: HttpClient) { }


  getAllByPageable(page: number, pageSize: number): Observable<Pageable> {
    return this.httpClient.get<Pageable>(environment.apiUrl + 'filebot-executor?page=' + page + '&size=' + pageSize);
  }

  reExecute(id: string): Observable<any> {
    return this.httpClient.put(environment.apiUrl + 'filebot-executor/' + id, {});
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + 'filebot-executor/' + id);
  }

}
