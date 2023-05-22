// import { FeedShowsService } from '../../shared/services/feed-shows.service';
// import { FormControl } from '@angular/forms';
// import { FeedTorrentDialogComponent } from '../feed-torrent-dialog/feed-torrent-dialog.component';
// import { DialogDeleteMediaComponent } from '../dialog-delete-media/dialog-delete-media.component';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FeedMetadataDialogComponent } from '../feed-metadata-dialog/feed-metadata-dialog.component';
// import { FeedShow, Type, TorrentPage, Torrent } from '../../shared/models/feed-show.model';
// import { Inject, Component, OnInit, Input } from '@angular/core';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatSelectChange } from '@angular/material/select';


// export interface TypeContent {
//   key: Type
//   value: string
// }
// export interface TorrentPageContent {
//   key: TorrentPage
//   value: string
// }
// @Component({
//   selector: 'torrent-show-chapter-data',
//   templateUrl: './torrent-show-chapter-data.component.html',
//   styleUrls: ['./torrent-show-chapter-data.component.scss']
// })

// export class TorrentShowChapterDataComponent implements OnInit {
//   @Input() torrent!: Torrent;
//   torrentPages: TorrentPageContent[] = [];
//   constructor(
//     private feedShowsService: FeedShowsService,
//     private route: ActivatedRoute,
//     private router: Router,
//     public dialog: MatDialog,
//     private snackBar: MatSnackBar
//   ) {
//   }

//   step = -1;
//   ngOnInit(): void {
//     console.log(this.torrent.torrentSeasonsChapters);
//   }

//   setStep(index: number) {
//     this.step = index;
//   }

//   nextStep() {
//     this.step++;
//   }

//   prevStep() {
//     this.step--;
//   }

//   selectionChanged(sel: MatSelectChange) {
//     console.log(sel.value)
//   }

//   openDialogDelete(object: any): void {
//     const dialogRef = this.dialog.open(DialogDeleteMediaComponent, {
//       width: 'auto',
//       height: 'auto',
//       data: object.title ? object.title : object.torrentTitle
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.deleteTorrent(object);
//       }
//     });
//   }

//   deleteTorrent(feedFilm: FeedShow): void {
//     // this.data.films.delete(id);
//     // this.feedShowsService.deleteFilm(feedFilm.id).subscribe(
//     //   (deleted) => this.router.navigate(['/automation/films'])
//     // )
//     //TODO FIX THIS
//   }
//   downloadTorrentFilm(torrent: Torrent): void {
//     torrent.assignToDownload = true;
//     this.updateTorrent(torrent);
//   }
//   openTorrentDialogInfo(torrent: Torrent): void {
//     const dialogRef = this.dialog.open(FeedTorrentDialogComponent, {
//       width: '450px',
//       height: 'auto',
//       data: {
//         torrent: torrent
//       }
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.updateTorrent(result);
//       }
//     });
//   }

//   private updateTorrent(torrent: Torrent) {
//     // this.feedFilmsService.updateFilmTorrent(torrent).subscribe(
//     //   (film) => {
//     //     console.log("Updated torrent!")
//     //     // this.updated.emit(this.film);
//     //     // this.film = film;
//     //     // setTimeout(() => {
//     //     //   this.reloadFilm();
//     //     // }, 2000);
//     //   },
//     //   (error) => {
//     //     console.log(error)
//     //   }
//     // );
//   }

// }
