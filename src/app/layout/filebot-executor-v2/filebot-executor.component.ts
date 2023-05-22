
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  MatDialog
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';
import { DialogAddQbittorrentComponent } from 'src/app/components/dialog-add-qbittorrent/dialog-add-qbittorrent.component';
import { DialogDeleteMediaComponent } from 'src/app/components/dialog-delete-media/dialog-delete-media.component';
import { DialogEditFilebotExecutorComponent } from 'src/app/components/dialog-edit-filebot-executor/dialog-edit-filebot-executor.component';
import { FilebotExecutor, FilebotExecutorStatus } from 'src/app/shared/models/filebot-executor.model';
import { FilebotExecutorService } from 'src/app/shared/services/filebot-executor.service';

export interface PageableData {
  filebots: FilebotExecutor[];
  loading: boolean;
}
@Component({
  selector: 'app-filebot-executor',
  templateUrl: './filebot-executor.component.html',
  styleUrls: ['./filebot-executor.component.scss'],
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
export class FilebotExecutorComponent {
  dataSource = [];
  expandedElement: FilebotExecutor | null;
  actualPage: number = 0;
  resultsLength = 0;
  status: String[] = [];
  statusSelected: string = null;
  searchInput: string = null;
  debounceTime = 500;
  pageSize: number = 20;
  paginator: boolean;
  data: PageableData = {
    filebots: [],
    loading: false,
  };
  displayedColumns: string[] = ['filesName', 'newFilesName', 'status', 'actions'];

  //displayedColumns: string[] = ['path', 'newPath', 'fileName', 'newFileName', 'status', 'download', 'edit', 'delete', 'reExecute'];
  panelOpenState = false;
  // @Input()
  // @Input()
  // @Input()
  fullPage: boolean = false



  form: UntypedFormGroup;

  // constructor(
  //   private filebotExecutorService: FilebotExecutorService,
  //   private snackBar: MatSnackBar
  // ) {
  //   this.reloadData();
  // }


  reloadData() {
    this.data.loading = true;
    this.filebotExecutorService.getAllByPageable(this.actualPage, this.pageSize, this.searchInput, this.statusSelected).subscribe(
      (nextNews) => {
        const contentData = nextNews.content;
        contentData.forEach(element => {
          element.path = element.path.substring(element.path.lastIndexOf('/') + 1);
          // console.log(element.path);
        });
        this.data.filebots = contentData;
        this.data.loading = false;
        this.resultsLength = nextNews.totalElements;
      },
      (error) =>
        this.snackBar.open('No data to display', undefined, { duration: 4000 })
    );
  }

  getColor(filebotExecutor: FilebotExecutor) {
    // console.log(filebotExecutor.status)
    switch (filebotExecutor.status) {

      case FilebotExecutorStatus.UNPROCESSED:
        return 'green';
      case FilebotExecutorStatus.ON_TELEGRAM:
        return 'blue';
      case FilebotExecutorStatus.PENDING:
        return 'red';
      case FilebotExecutorStatus.ON_FILEBOT_EXECUTION:
        return 'red';
      case FilebotExecutorStatus.PROCESSED:
        // console.log('PROCESSEDsssss')
        return 'blue';
      case FilebotExecutorStatus.FILES_EXISTED_IN_DESTINATION:
        return 'red';
      case FilebotExecutorStatus.ERROR:
        return 'red';
      case FilebotExecutorStatus.FILES_NOT_FOUND:
        return 'red';
      // default:
      //   return 'lightpink';
    }
  }




  constructor(
    private filebotExecutorService: FilebotExecutorService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private formBuilder: UntypedFormBuilder,
  ) {
    this.status = Object.keys(FilebotExecutorStatus).filter((v) => isNaN(Number(v)));
    this.status.reverse();
    this.status.push(null);
    this.status.reverse();
    this.form = new UntypedFormGroup({
      status: new UntypedFormControl(''),
      search: new UntypedFormControl(''),
    });
  }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      status: new UntypedFormControl(''),
      search: new UntypedFormControl(''),
    });
    this.form.valueChanges.pipe(
      debounceTime(this.debounceTime),
    ).subscribe(changes => this.formChanged(changes));
  }


  formChanged(currentValue: any) {
    const fields = ['search', 'status', 'email'];
    this.statusSelected = this.form.get('status').value;
    this.searchInput = this.form.get('search').value;

    this.reloadData();
    // if(this.userValue[fieldName] !== currentValue[fieldName]) {
    //   console.log('Came inside');
    //   this.disableButton = false;
    //   return;
    // }

  }


  ngAfterViewInit() {
    this.data.loading = true;
    this.filebotExecutorService.getAllByPageable(this.actualPage, this.pageSize, this.searchInput, this.statusSelected).subscribe(
      (nextNews) => {
        const contentData = nextNews.content;
        contentData.forEach(element => {
          element.path = element.path.substring(element.path.lastIndexOf('/') + 1);
          // console.log(element.path);
        });
        this.data.filebots = contentData;
        this.data.loading = false;
        this.resultsLength = nextNews.totalElements;
      },
      (error) =>
        this.snackBar.open('No data to display', undefined, { duration: 4000 })
    );

  }


  // pageEvents(event: any) {
  //   console.log()
  //   this.pageEventToParent.emit(event);

  // }

  reExecute(filebotExecutor: FilebotExecutor) {
    this.filebotExecutorService
      .editFilebotExecutor(filebotExecutor.id, filebotExecutor)
      .subscribe(
        (data) => {
          this.snackBar.open('Re-executed', '', {
            duration: 2000,
          });
          filebotExecutor = data;
        }
      );
  }

  manualExecution() {
    this.filebotExecutorService
      .manualExecution()
      .subscribe(
        (data) => {
          this.snackBar.open('Manual Execution started', '', {
            duration: 2000,
          });
        }
      );

  }

  delete(filebotExecutor: FilebotExecutor) {
    const dialogRef = this.matDialog.open(DialogDeleteMediaComponent, {
      width: '50%',
      height: 'auto',
      data: filebotExecutor.path
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.loadMedia();
      if (result) {
        this.filebotExecutorService.delete(filebotExecutor.id).subscribe(
          (data) => {
            this.snackBar.open('Deleted', '', {
              duration: 2000,
            });
            this.reloadData();
          },
          (error) => {
            this.snackBar.open('Error deleting execution', error, {
              duration: 2000,
            })
          });
      }
      else {
        this.snackBar.open('Not Deleted', undefined, { duration: 4000 })
      }
    });

  }

  edit(filebotExecutor: FilebotExecutor) {
    const dialogRef = this.matDialog.open(DialogEditFilebotExecutorComponent, {
      width: '50%',
      height: 'auto',
      data: {
        id: filebotExecutor.id,
        category: filebotExecutor.category,
        path: filebotExecutor.path,
        command: filebotExecutor.command,
        english: filebotExecutor.english,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  add() {
    const dialogRef = this.matDialog.open(DialogAddQbittorrentComponent, {
      width: '50%',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.reloadData();
    });
  }
  downloadLog(filebotExecutor: FilebotExecutor) {
    this.filebotExecutorService.downloadLog(filebotExecutor.log);
    // .subscribe(
    //   (data) => {
    //     this.snackBar.open('Downloaded', '', {
    //       duration: 2000,
    //     });
    //   },
    //   (error) => {
    //     this.snackBar.open('Error downloading log', error, {
    //       duration: 2000,
    //     })
    //   });
  }


  pageEvents(event) {
    console.log("PAGE EVENT")
    if (this.data.loading) { return; }
    this.data.loading = true;
    this.actualPage = event.pageIndex;
    this.filebotExecutorService.getAllByPageable(this.actualPage, this.pageSize, this.searchInput, this.statusSelected).subscribe(
      (nextNews) => {
        const contentData = nextNews.content;
        contentData.forEach(element => {
          element.path = element.path.substring(element.path.lastIndexOf('/') + 1);
          console.log(element.path);
        });
        this.data.filebots = contentData;
        this.data.loading = false;
        this.resultsLength = nextNews.totalElements;
      },
      (error) =>
        this.snackBar.open('No data to display', undefined, { duration: 4000 })
    );
  }
}
