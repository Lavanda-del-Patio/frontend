import { FeedMetadataDialogComponent } from './../../../../components/feed-metadata-dialog/feed-metadata-dialog.component';
import { FeedTorrentDialogComponent } from './../../../../components/feed-torrent-dialog/feed-torrent-dialog.component';
import { DialogDeleteMediaComponent } from './../../../../components/dialog-delete-media/dialog-delete-media.component';
import { FormControl } from '@angular/forms';
import { FeedFilm, Torrent, TorrentPage } from './../../../../shared/models/feed-film.model';
import { FeedFilmsService } from './../../../../shared/services/feed-films.service';
import { Component, OnInit, Input } from '@angular/core';
import { Type } from 'src/app/shared/models/feed-show.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface TorrentPageContent {
  key: TorrentPage
  value: string
}

@Component({
  selector: 'app-automation-film',
  templateUrl: './automation-film.component.html',
  styleUrls: ['./automation-film.component.scss'],
})
export class AutomationFilmComponent implements OnInit {
  @Input() feedFilm!: FeedFilm;
  id: any = '';
  torrentPages: TorrentPageContent[] = [];
  activeLink!: Torrent;

  constructor(
    private feedFilmsService: FeedFilmsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
      this.getFilm();
    })
  }

  reloadFeedFilm(feedFilm: FeedFilm) {
    this.getFilm();
  }

  getFilm() {
    this.feedFilmsService.getFilm(this.id).subscribe(
      (response) => {
        this.feedFilm = response
      },
      (error) => console.log(error))
  }

  openDialogDelete(object: any): void {
    const dialogRef = this.dialog.open(DialogDeleteMediaComponent, {
      width: 'auto',
      height: 'auto',
      data: object.title ? object.title : object.torrentTitle
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (object.title) {
          this.deleteFilm(object);
        } else {
          this.deleteTorrent(object);
        }
      }
    });
  }

  updateFeedFilm(event: any) {
    this.getFilm();
  }

  deleteFilm(feedFilm: FeedFilm): void {
    // this.data.films.delete(id);
    this.feedFilmsService.deleteFilm(feedFilm.id).subscribe(
      (deleted) => this.router.navigate(['/automation/films'])
    )
    //TODO FIX THIS
  }

  deleteTorrent(torrent: Torrent) {
    this.feedFilmsService.deleteTorrent(torrent.torrentId).subscribe((deleted) => console.log("deleted"))

  }

  private openSnackBar(message: string, action?: string) {
    if (action) {
      this.snackBar.open(message, action, { duration: 2000 });
    } else {
      this.snackBar.open(message);
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 2000);
    }
  }
}
