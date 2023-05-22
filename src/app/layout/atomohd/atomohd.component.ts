import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { MediaService } from '../../shared/services/media.service';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { AtomohdService } from 'src/app/shared/services/atomohd.service';
import { Atomohd } from 'src/app/shared/models/atomohd.model';

@Component({
  selector: 'app-atomohd',
  templateUrl: './atomohd.component.html',
  styleUrls: ['./atomohd.component.scss'],
})
export class AtomohdComponent  {

  onConversion: boolean = false;
  loading: boolean = false;
  gridColumns = 6
  // lastFilms: FeedFilm[] = [];
  // lastShows: FeedShow[] = [];

  lastPlexFilms: any[] = [];
  lastPlexShows: any[] = []

  interval!: Subscription;
  constructor(
    private router: Router,
    private atomohdService: AtomohdService,
  ) {
  }
  displayedColumns: string[] = ['name', 'fullname'];
  dataSource = [];
  expandedElement: Atomohd | null;


  pageSize: number = 20;
  paginator: boolean;

  resultsLength = 0;





}
