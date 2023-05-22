// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSelectChange } from '@angular/material/select';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ActivatedRoute, Router } from '@angular/router';
// import { TorrentPage, Type } from '../../shared/models/feed-film.model';
// import { FeedFilm } from './../../shared/models/feed-film.model';
// import { FeedFilmsService } from './../../shared/services/feed-films.service';
// import { DialogDeleteMediaComponent } from './../dialog-delete-media/dialog-delete-media.component';
// import { FeedMetadataDialogComponent } from './../feed-metadata-dialog/feed-metadata-dialog.component';


// export interface TypeContent {
//   key: Type
//   value: string
// }

// export interface TorrentPageContent {
//   key: TorrentPage
//   value: string
// }
// @Component({
//   selector: 'feed-metadata',
//   templateUrl: './feed-metadata.component.html',
//   styleUrls: ['./feed-metadata.component.scss']
// })

// export class FeedMetadataComponent implements OnInit {
//   @Input() feedFilm!: FeedFilm;
//   @Output() reloadMetadataFeedFilm = new EventEmitter<boolean>();

//   types: TypeContent[] = [];
//   torrentPages: TorrentPageContent[] = [];

//   constructor(
//     private feedFilmsService: FeedFilmsService,
//     private route: ActivatedRoute,
//     private router: Router,
//     public dialog: MatDialog,
//     private snackBar: MatSnackBar

//   ) {
//   }
//   ngOnInit(): void {
//     this.types = [
//       { key: Type.FILM, value: "Film" },
//       { key: Type.SHOW, value: "Show" }
//     ];
//   }
//   reloadFeedFilm(feedFilm: FeedFilm) {
//     this.reloadMetadataFeedFilm.emit(false)
//   }

//   reloadMetadata(feedFilm: FeedFilm) {
//     this.reloadMetadataFeedFilm.emit(true)
//   }

//   selectionChanged(sel: MatSelectChange) {
//     console.log(sel.value)
//   }
//   openMetadataDialogInfo(feedFilm: FeedFilm): void {
//     const dialogRef = this.dialog.open(FeedMetadataDialogComponent, {
//       width: '450px',
//       height: 'auto',
//       data: {
//         feedFilm: feedFilm
//       }
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.updateMetadata(result);

//       }
//     });
//   }
//   private updateMetadata(updatedFilm: FeedFilm) {
//     this.feedFilmsService.updateFilm(updatedFilm).subscribe(
//       (film) => {
//         this.feedFilm = film;
//       },
//       (error) => {
//         console.log(error)
//       }
//     );
//   }
//   openDialogDelete(object: any): void {
//     const dialogRef = this.dialog.open(DialogDeleteMediaComponent, {
//       width: 'auto',
//       height: 'auto',
//       data: object.title ? object.title : object.torrentTitle
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.deleteFilm(object);
//       }
//     });
//   }

//   deleteFilm(feedFilm: FeedFilm): void {
//     // this.data.films.delete(id);
//     this.feedFilmsService.deleteFilm(feedFilm.id).subscribe(
//       (deleted) => this.router.navigate(['/automation/films'])
//     )
//     //TODO FIX THIS
//   }


// }
