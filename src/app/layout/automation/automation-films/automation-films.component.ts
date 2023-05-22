// import { animate, state, style, transition, trigger } from '@angular/animations';
// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { PageEvent } from '@angular/material/paginator';
// import { Pageable } from 'src/app/shared/models/pageable.model';
// import { FeedFilmsService } from './../../../../../src/app/shared/services/feed-films.service';
// import { FeedFilm } from './../../../shared/models/feed-film.model';


// interface Datasource {
//   films: FeedFilm[],
//   pageToLoadNext: number,
// }
// @Component({
//   selector: 'app-automation-films',
//   templateUrl: './automation-films.component.html',
//   styleUrls: ['./automation-films.component.scss'],
//   animations: [
//     trigger('fadeSlideInOut', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateY(10px)' }),
//         animate('700ms', style({ opacity: 1, transform: 'translateY(0)' })),
//       ]),
//       transition(':leave', [
//         animate('700ms', style({ opacity: 0, transform: 'translateY(10px)' })),
//       ]),
//     ]),
//   ]
// })
// export class AutomationFilmsComponent implements OnInit {

//   data: Pageable;
//   pageSize = 20;
//   pageSizeOptions = [28, 56, 112];
//   pageEvent: PageEvent;

//   constructor(
//     private feedFilmsService: FeedFilmsService) {
//     this.data = { content: [], empty: true, first: true, numberOfElements: 0, number: 0, size: 0, totalElements: 0, totalPages: 0, last: false };
//   }

//   ngOnInit(): void {
//     this.pageEvent = { length: 0, pageIndex: 0, pageSize: this.pageSizeOptions[0], previousPageIndex: 0 };
//     this.feedFilmsService.getFilmsByPageEvent(this.pageEvent).subscribe((feedFilms) => {
//       this.data = feedFilms;
//     });
//   }

//   public updatePageable(event?: PageEvent) {
//     this.feedFilmsService.getFilmsByPageEvent(event).subscribe(
//       response => {
//         this.data = response;
//         window.scroll(0,0);
//       },
//       error => {
//         // handle error
//       }
//     );
//     return event;
//   }

//   updatedFilm(feedFilm: FeedFilm) {
//     // this.formatData([feedFilm]);
//   }

//   deletedFilm(id: string): void {
//     // this.data.films.delete(id);
//     //TODO FIX THIS
//   }
// }
