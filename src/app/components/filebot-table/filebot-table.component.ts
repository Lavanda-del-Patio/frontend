import { MatSnackBar } from '@angular/material/snack-bar';
import { FilebotService } from './../../shared/services/filebot.service';
import { Inject, Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { DialogDeleteMediaComponent } from '../dialog-delete-media/dialog-delete-media.component';
import { Filebot } from 'src/app/shared/models/filebot.model';



@Component({
  selector: 'filebot-table-app',
  templateUrl: './filebot-table.component.html',
  styleUrls: ['./filebot-table.component.scss']
})

export class FilebotTableComponent implements OnInit {
  displayedColumns: string[] = ['originalName', 'newName', 'newLocation', 'lastModifiedAt'];

  resultsLength = 0;
  data: PageableData = {
    filebots: [],
    loading: false,
  };
  @Input() pageSize: number;
  @Input() paginator: boolean;


  constructor(private filebotService: FilebotService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.data.loading) { return; }
    this.data.loading = true;
    this.filebotService.getAllByPageable(0, this.pageSize).subscribe(nextNews => {
      const contentData = nextNews.content;
      this.data.filebots = contentData;
      this.data.loading = false;
      this.resultsLength = nextNews.totalElements;
    },
      (error) => this.snackBar.open('No data to display', undefined, { duration: 4000 })
    );
  }

  pageEvents(event: any) {
    if (this.data.loading) { return; }

    this.data.loading = true;
    this.filebotService.getAllByPageable(event.pageIndex, this.pageSize).subscribe(nextNews => {
      const contentData = nextNews.content;
      this.data.filebots = contentData;
      this.data.loading = false;
      this.resultsLength = nextNews.totalElements;
    });
  }
}
export interface PageableData {
  filebots: Filebot[];
  loading: boolean,
}
