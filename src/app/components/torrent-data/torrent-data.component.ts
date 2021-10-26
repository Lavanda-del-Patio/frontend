import { FormControl } from '@angular/forms';
import { FeedTorrentDialogComponent } from './../feed-torrent-dialog/feed-torrent-dialog.component';
import { DialogDeleteMediaComponent } from './../dialog-delete-media/dialog-delete-media.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedFilmsService } from './../../shared/services/feed-films.service';
import { FeedMetadataDialogComponent } from './../feed-metadata-dialog/feed-metadata-dialog.component';
import { FeedFilm, Type, TorrentPage, Torrent } from '../../shared/models/feed-film.model';
import { Inject, Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';


export interface TypeContent {
  key: Type
  value: string
}

export interface TorrentPageContent {
  key: TorrentPage
  value: string
}
@Component({
  selector: 'torrent-data',
  templateUrl: './torrent-data.component.html',
  styleUrls: ['./torrent-data.component.scss']
})

export class TorrentDataComponent implements OnInit {
  @Input() torrents!: Torrent[];
  torrentPages: TorrentPageContent[] = [];
  selected = new FormControl(0);

  constructor(
    private feedFilmsService: FeedFilmsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar

  ) {
  }
  ngOnInit(): void {

  }

  selectionChanged(sel: MatSelectChange) {
    console.log(sel.value)
  }

  openDialogDelete(object: any): void {
    const dialogRef = this.dialog.open(DialogDeleteMediaComponent, {
      width: 'auto',
      height: 'auto',
      data: object.title ? object.title : object.torrentTitle
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFilm(object);
      }
    });
  }

  deleteFilm(feedFilm: FeedFilm): void {
    // this.data.films.delete(id);
    this.feedFilmsService.deleteFilm(feedFilm.id).subscribe(
      (deleted) => this.router.navigate(['/automation/films'])
    )
    //TODO FIX THIS
  }
  downloadTorrentFilm(torrent: Torrent): void {
    torrent.assignToDownload = true;
    this.updateTorrent(torrent);
  }
  openTorrentDialogInfo(torrent: Torrent): void {
    const dialogRef = this.dialog.open(FeedTorrentDialogComponent, {
      width: '450px',
      height: 'auto',
      data: {
        torrent: torrent
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTorrent(result);
      }
    });
  }

  private updateTorrent(torrent: Torrent) {
    this.feedFilmsService.updateFilmTorrent(torrent).subscribe(
      (film) => {
        console.log("Updated torrent!")
        // this.updated.emit(this.film);
        // this.film = film;
        // setTimeout(() => {
        //   this.reloadFilm();
        // }, 2000);
      },
      (error) => {
        console.log(error)
      }
    );
  }

}
