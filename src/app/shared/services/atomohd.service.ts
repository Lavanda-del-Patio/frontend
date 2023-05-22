import { Filebot } from '../models/filebot.model';
import { Pageable } from '../models/pageable.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AtomohdService {
    constructor(private httpClient: HttpClient) { }


    getAllByPageable(page: number, pageSize: number): Observable<Pageable> {
        return this.httpClient.get<Pageable>(environment.apiUrl + 'atomohd?page=' + page + '&size=' + pageSize);
    }

}
