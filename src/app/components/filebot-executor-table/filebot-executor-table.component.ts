import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';
import { FilebotExecutor, FilebotExecutorStatus } from 'src/app/shared/models/filebot-executor.model';
import { FilebotExecutorService } from 'src/app/shared/services/filebot-executor.service';

import { DialogAddQbittorrentComponent } from '../dialog-add-qbittorrent/dialog-add-qbittorrent.component';
import { DialogDeleteMediaComponent } from '../dialog-delete-media/dialog-delete-media.component';
import { DialogEditFilebotExecutorComponent } from '../dialog-edit-filebot-executor/dialog-edit-filebot-executor.component';



export interface PageableData {
  filebots: FilebotExecutor[];
  loading: boolean;
}

@Component({
  selector: 'filebot-executor-table-app',
  templateUrl: './filebot-executor-table.component.html',
  styleUrls: ['./filebot-executor-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})

export class FilebotExecutorTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['path', 'newPath', 'fileName', 'newFileName', 'status', 'download', 'edit', 'delete', 'reExecute'];
  panelOpenState = false;
  @Input() pageSize: number;
  @Input() paginator: boolean;
  @Input() fullPage: boolean = false

  actualPage: number = 0;

  resultsLength = 0;
  data: PageableData = {
    filebots: [],
    loading: false,
  };
  form: FormGroup;
  status: String[] = [];
  statusSelected: string = null;
  searchInput: string = null;
  debounceTime = 500;


  constructor(
    private filebotExecutorService: FilebotExecutorService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    this.status = Object.keys(FilebotExecutorStatus).filter((v) => isNaN(Number(v)));
    this.status.reverse();
    this.status.push(null);
    this.status.reverse();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      status: new FormControl(''),
      search: new FormControl(''),
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
        action: filebotExecutor.action
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
