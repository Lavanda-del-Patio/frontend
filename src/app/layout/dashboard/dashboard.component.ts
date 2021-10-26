import { FeedShowsService } from './../../shared/services/feed-shows.service';
import { FeedFilmsService } from './../../shared/services/feed-films.service';
import { FeedShow } from './../../shared/models/feed-show.model';
import { FeedFilm } from './../../shared/models/feed-film.model';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { MediaService } from '../../shared/services/media.service';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  onConversion: boolean = false;
  loading: boolean = false;
  gridColumns = 6
  lastFilms: FeedFilm[] = [];
  lastShows: FeedShow[] = [];

  lastPlexFilms: any[] = [];
  lastPlexShows: any[] = []

  interval!: Subscription;
  constructor(
    private router: Router,
    private mediaService: MediaService,
    private feedFilmService: FeedFilmsService,
    private feedShowsService: FeedShowsService
  ) {
  }

  ngOnInit() {
    this.feedFilmService.getLastFilms().subscribe(
      (response) => {
        this.lastFilms = response;
      },
      (error) => console.log(error))
    this.feedShowsService.getLastShows().subscribe(
      (response) => {
        this.lastShows = response;
      },
      (error) => console.log(error))
  }



  ngOnDestroy() {
    if (this.interval != undefined) {
      this.interval.unsubscribe();
    }
  }






}
