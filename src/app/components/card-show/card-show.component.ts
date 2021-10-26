import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { FeedShow } from './../../shared/models/feed-show.model';
import { DialogDeleteMediaComponent } from './../dialog-delete-media/dialog-delete-media.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedShowsService } from './../../shared/services/feed-shows.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-card-show',
    templateUrl: './card-show.component.html',
    styleUrls: ['./card-show.component.scss'],
    providers: [DatePipe]
})

export class CardShowComponent implements OnInit{
  @Input() show!: FeedShow;
  @Output() deleted = new EventEmitter<string>();
  @Output() updated = new EventEmitter<FeedShow>();
  dateParsed!: string;
  imageConverted!: string;
  contains4K!: boolean;
  containsHDR!: boolean;
  isDownloaded!: boolean;
  isFilm!: boolean;
  isShow!: boolean;
  defaultImage = "/assets/images/default-image-3.png"

  constructor(
    public dialog: MatDialog,
    private readonly feedShowsService: FeedShowsService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "plextv",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/plextv.svg")
    );
  }
  ngOnInit(): void {
    this.dateParsed = this.getAddedDate();
    this.imageConverted = this.getImage();
    this.contains4K = this.torrentsContains4K();
    this.containsHDR = this.torrentContainsHDR();
    this.isFilm = this.isTypeFilm();
    this.isShow = this.isTypeShow();
    this.isDownloaded = this.torrentIsDownloaded();
  }

  private getImage(): string {
    if (this.show.image === null || this.show.image === 'https://image.tmdb.org/t/p/originalnull') {
      return this.defaultImage
    }
    else {
      return this.show.image
    }
  }

  private isTypeFilm(): boolean {
    if (this.show.type) {
      return 'FILM' === this.show.type.valueOf();
    }
    return false;
  }

  private isTypeShow(): boolean {
    if (this.show.type) {
      return 'SHOW' === this.show.type.valueOf();
    }
    return false;
  }

  private torrentIsDownloaded(): boolean {
    return this.show.torrents.some(torrent => torrent.downloaded && torrent.assignToDownload);
  }

  private torrentsContains4K(): boolean {
    return this.show.torrents.some(torrent => torrent.torrentQuality.includes('4K'));
  }

  private torrentContainsHDR(): boolean {
    return this.show.torrents.some(torrent => torrent.torrentUrl.includes('HDR'));
  }

  private getAddedDate(): string {
    let lastModifiedAt = this.show.createdAt;
    if (lastModifiedAt) {
      let dateNow = new Date();
      let lastModifiedAtOnDate = new Date(lastModifiedAt);
      let comparative = dateNow.getTime() - lastModifiedAtOnDate.getTime();
      let days = comparative / (1000 * 60 * 60 * 24);
      if (days < 1) {
        return 'Today'
      }
      else if (days == 1) {
        return 'Yesterday'
      }
      else {
        return this.datePipe.transform(this.show.lastModifiedAt, 'dd/MM/yyyy')!;
      }
    }
    else
      return 'NO DATE';
  }
}
