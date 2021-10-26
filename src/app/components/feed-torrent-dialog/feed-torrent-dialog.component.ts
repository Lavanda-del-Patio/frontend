import { FeedFilm, Type, TorrentPage, Torrent } from '../../shared/models/feed-film.model';
import { Inject, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { DialogDeleteMediaComponent } from '../dialog-delete-media/dialog-delete-media.component';


export interface TypeContent {
  key: Type
  value: string
}

export interface TorrentPageContent {
  key: TorrentPage
  value: string
}
@Component({
  selector: 'feed-torrent-dialog',
  templateUrl: './feed-torrent-dialog.component.html',
  styleUrls: ['./feed-torrent-dialog.component.scss']
})

export class FeedTorrentDialogComponent implements OnInit {

  types: TypeContent[] = [];
  torrentPages: TorrentPageContent[] = [];
  torrent: any = undefined;
  feedFilm: any = undefined;

  constructor(
    public dialogRef: MatDialogRef<FeedTorrentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.torrent = data.torrent;
    this.feedFilm = data.feedFilm;
  }
  ngOnInit(): void {
    this.torrentPages = [
      { key: TorrentPage.DON_TORRENT, value: "Don Torrent" },
      { key: TorrentPage.PCTMIX, value: "Pctmix" },
      { key: TorrentPage.PCTFENIX, value: "Pctfenix" },
    ]
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectionChanged(sel: MatSelectChange) {
    console.log(sel.value)
  }
  openDialogDelete(torrent: Torrent): void {
    // const dialogRef = this.dialog.open(DialogDeleteMediaComponent, {
    //   width: 'auto',
    //   height: 'auto',
    //   data: torrent. ? feedFilm.title : feedFilm.torrentTitle
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Eliminar');
    //     this.deleteFilm(feedFilm);
    //   }
    // });
  }
  downloadFilm(feedFilm: any): void {
    feedFilm.assignToDownload = true;
    // this.updateTorrent(feedFilm);
  }
}
