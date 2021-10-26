import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FlatMediaDatasource } from '../../shared/datasources/flat-media-datasource';
import { FlatMedia } from '../../shared/models/flatmedia.model';
import { FloatPlayerComponent } from '../../shared/modules/float-player/float-player.component';
import { MediaService } from '../../shared/services/media.service';
import { DialogAddTranscodesComponent } from '../dialog-add-transcodes/dialog-add-transcodes.component';
import { DialogDeleteMediaComponent } from '../dialog-delete-media/dialog-delete-media.component';
import { DialogUploadMediaComponent } from '../dialog-upload-media/dialog-upload-media.component';



@Component({
  selector: 'app-flat-media',
  templateUrl: './flat-media.component.html',
  styleUrls: ['./flat-media.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FlatMediaComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @ViewChild(TemplateRef, { read: ViewContainerRef })

  panelOpenState = false;


  flatMedia: FlatMedia[] = [];
  isCollapsed = true;
  page = 0;
  pageSize = 10;
  isAuthenticated = false;

  innerWidth!: number;

  finished!: boolean;
  noVideos!: boolean;
  displayedColumns: string[] = ['name', 'type', 'filesize', 'duration', 'container', 'videoCodec', 'audioCodec', 'resolution'
    , 'bitrate', 'watch', 'download', 'edit', 'delete'];
  expandedElement!: FlatMedia | null;
  subscriptionAuthenticationState!: Subscription;

  constructor(private mediaService: MediaService,
    public matDialog: MatDialog,
    // private oktaAuth: OktaAuthService
  ) {
  }



  noTranscodeData(message: string) {
    this.expandedElement = null;
  }

  async ngOnInit() {
    this.mediaService.getAllMediaByPageable(0, 3).subscribe((response) => {
      this.flatMedia = response.content
      console.log(this.flatMedia)
    })
    // this.isAuthenticated = this.oktaAuth.hasValidToken();

    // this.isAuthenticated = this.oauthService.hasValidAccessToken();
    // if (this.isAuthenticated) {
    //   this.loadPaginator();
    // }
    // this.subscriptionAuthenticationState = this.oktaAuth.isAuthenticated$.subscribe(isAuthenticated => {
    //   this.isAuthenticated = isAuthenticated;
    //   this.loadPaginator();
    // });
    // this.innerWidth = window.innerWidth;
  }


  isMkv(flatMedia: FlatMedia): boolean {
    return flatMedia.container === 'MKV';
  }

  uploadContent() {
    const dialogRef = this.matDialog.open(DialogUploadMediaComponent, {
      width: '50%',
      height: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.loadMedia();
    });
  }
  infoMedia() {

  }

  watchVideo(flatMediaId: FlatMedia) {
    const url = this.mediaService.watchById(flatMediaId.id);
    if (url === undefined) {
      // TODO: Sacar stepper de esos que indique que no hay video
    } else {
      const dialogConfig = new MatDialogConfig();
      let relativeWidth = (this.innerWidth * 30) / 100; // take up to 80% of the screen size
      if (this.innerWidth > 1500) {
        relativeWidth = (1500 * 30) / 100;
      } else {
        relativeWidth = (this.innerWidth * 30) / 100;
      }
      const relativeHeight = (relativeWidth * 9) / 16 + 120; // 16:9 to which we add 120 px for the dialog action buttons ("close")
      dialogConfig.width = relativeWidth + 'px';
      // dialogConfig.height = relativeHeight + 'px';
      dialogConfig.hasBackdrop = false;
      dialogConfig.closeOnNavigation = false;
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.position = {
        'bottom': '30px',
        'left': '30px'
      };
      dialogConfig.data = {
        url: url
      };
      const dialogRef = this.matDialog.open(FloatPlayerComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }

  downloadVideo(flatMediaId: string) {
    this.mediaService.downloadById(flatMediaId);
  }

  addTranscodes(flatMedia: FlatMedia) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.closeOnNavigation = false;
    dialogConfig.width = 'auto';
    dialogConfig.height = 'auto';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      media: flatMedia
    };
    const dialogRef = this.matDialog.open(DialogAddTranscodesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      // this.loadMedia();
    });
  }

  deleteMedia(flatMedia: FlatMedia) {
    const dialogRef = this.matDialog.open(DialogDeleteMediaComponent, {
      width: 'auto',
      height: 'auto',
      data: flatMedia.name
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.mediaService.deleteFlat(flatMedia.id).subscribe((response) =>
          console.log(response)
        )
      }
    });
  }

  ngOnDestroy() {
    if (this.subscriptionAuthenticationState) {
      this.subscriptionAuthenticationState.unsubscribe();
    }
  }
}
