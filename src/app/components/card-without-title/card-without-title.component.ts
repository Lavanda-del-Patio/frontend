import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedFilm } from '../../shared/models/feed-film.model';

@Component({
  selector: 'app-card-without-title',
  templateUrl: './card-without-title.component.html',
  styleUrls: ['./card-without-title.component.scss']
})
export class CardWithoutTitleComponent implements OnInit {

  @Input() content!: any;

  defaultImage = "/assets/images/default-image-3.png"

  constructor(
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  getImage() {
    if (this.content.image === null || this.content.image === 'https://image.tmdb.org/t/p/originalnull') {
      return this.defaultImage
    }
    else { return this.content.image }
  }

}
