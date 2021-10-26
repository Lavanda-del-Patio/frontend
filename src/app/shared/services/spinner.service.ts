import { environment } from './../../../environments/environment';
import { Transcode } from './../models/transcode-selected.model';
import { TranscodeApi } from './../models/transcode.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TranscodeMedia } from '../models/transcodemedia.model';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  visibility = new BehaviorSubject(false);

  constructor() {
  }

  show() {
    this.visibility.next(true);
  }

  hide() {
    this.visibility.next(false);
  }

}
