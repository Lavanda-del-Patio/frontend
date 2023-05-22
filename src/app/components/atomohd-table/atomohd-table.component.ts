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

import { Atomohd } from 'src/app/shared/models/atomohd.model';
import { AtomohdService } from 'src/app/shared/services/atomohd.service';




export interface PageableData {
  atomos: Atomohd[];
  loading: boolean;
}

@Component({
  selector: 'atomhd-table-app',
  templateUrl: './atomohd-table.component.html',
  styleUrls: ['./atomohd-table.component.scss'],
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

export class AtomohdTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name','fullName','seeders','leechers'];
  panelOpenState = false;
  @Input() pageSize: number;
  @Input() paginator: boolean;
  @Input() fullPage: boolean = false

  actualPage: number = 0;

  resultsLength = 0;
  data: PageableData = {
    atomos: [],
    loading: false,
  };
  form: UntypedFormGroup;
  status: String[] = [];
  statusSelected: string = null;
  searchInput: string = null;
  debounceTime = 500;


  constructor(
    private atomohdService: AtomohdService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private formBuilder: UntypedFormBuilder,
  ) {
    // this.status = Object.keys(FilebotExecutorStatus).filter((v) => isNaN(Number(v)));
    // this.status.reverse();
    // this.status.push(null);
    // this.status.reverse();
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
  reloadData() {
    this.data.loading = true;
    this.atomohdService.getAllByPageable(this.actualPage, this.pageSize).subscribe(
      (nextNews) => {
        const contentData = nextNews.content;
        contentData.forEach(element => {
          element.path = element.path.substring(element.path.lastIndexOf('/') + 1);
          // console.log(element.path);
        });
        this.data.atomos = contentData;
        this.data.loading = false;
        this.resultsLength = nextNews.totalElements;
      },
      (error) =>
        this.snackBar.open('No data to display', undefined, { duration: 4000 })
    );
  }

  ngAfterViewInit() {
    this.data.loading = true;
    this.atomohdService.getAllByPageable(this.actualPage, this.pageSize).subscribe(
      (nextNews) => {
        const contentData = nextNews.content;
        contentData.forEach(element => {
          // element.path = element.path.substring(element.path.lastIndexOf('/') + 1);
          // console.log(element.path);
        });
        this.data.atomos = contentData;
        this.data.loading = false;
        this.resultsLength = nextNews.totalElements;
      },
      (error) =>
        this.snackBar.open('No data to display', undefined, { duration: 4000 })
    );

  }



  // delete(filebotExecutor: Atomohd) {
  //   const dialogRef = this.matDialog.open(DialogDeleteMediaComponent, {
  //     width: '50%',
  //     height: 'auto',
  //     data: filebotExecutor.path
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     // this.loadMedia();
  //     if (result) {
  //       this.atomohdService.delete(filebotExecutor.id).subscribe(
  //         (data) => {
  //           this.snackBar.open('Deleted', '', {
  //             duration: 2000,
  //           });
  //           this.reloadData();
  //         },
  //         (error) => {
  //           this.snackBar.open('Error deleting execution', error, {
  //             duration: 2000,
  //           })
  //         });
  //     }
  //     else {
  //       this.snackBar.open('Not Deleted', undefined, { duration: 4000 })
  //     }
  //   });

  // }




  pageEvents(event) {
    console.log("PAGE EVENT")
    if (this.data.loading) { return; }
    this.data.loading = true;
    this.actualPage = event.pageIndex;
    this.atomohdService.getAllByPageable(this.actualPage, this.pageSize).subscribe(
      (nextNews) => {
        const contentData = nextNews.content;
        contentData.forEach(element => {
          element.path = element.path.substring(element.path.lastIndexOf('/') + 1);
          console.log(element.path);
        });
        this.data.atomos = contentData;
        this.data.loading = false;
        this.resultsLength = nextNews.totalElements;
      },
      (error) =>
        this.snackBar.open('No data to display', undefined, { duration: 4000 })
    );
  }
}
