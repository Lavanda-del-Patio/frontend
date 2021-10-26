import { Pageable } from './../../../shared/models/pageable.model';
import { FeedShow } from './../../../shared/models/feed-show.model';
import { FeedShowsService } from './../../../shared/services/feed-shows.service';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ViewChild, ElementRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FeedFilmsService } from './../../../../../src/app/shared/services/feed-films.service';
import { FeedFilm } from './../../../shared/models/feed-film.model';

interface Datasource {
  films: FeedShow[],
  pageToLoadNext: number,
}
@Component({
  selector: 'app-automation-shows',
  templateUrl: './automation-shows.component.html',
  styleUrls: ['./automation-shows.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('700ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('700ms', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
  ]
})
export class AutomationShowsComponent implements OnInit {

  data: Pageable;
  pageSize = 20;
  pageSizeOptions = [28, 56, 112];
  pageEvent: PageEvent;

  constructor(
    private feedShowsService: FeedShowsService) {
    this.data = { content: [], empty: true, first: true, numberOfElements: 0, number: 0, size: 0, totalElements: 0, totalPages: 0, last: false };
  }

  ngOnInit(): void {
    this.pageEvent = { length: 0, pageIndex: 0, pageSize: this.pageSizeOptions[0], previousPageIndex: 0 };
    this.feedShowsService.getShowsByPageEvent(this.pageEvent).subscribe((feedShows) => {
      this.data = feedShows;
      console.log(this.data)
    });
  }

  public updatePageable(event?: PageEvent) {
    this.feedShowsService.getShowsByPageEvent(event).subscribe(
      response => {
        this.data = response;
        window.scroll(0, 0);
      },
      error => {
        // handle error
      }
    );
    return event;
  }

  updatedFilm(feedFilm: FeedShow) {
    // this.formatData([feedFilm]);
  }

  deletedFilm(id: string): void {
    // this.data.films.delete(id);
    //TODO FIX THIS
  }

}
