import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Filebot } from './../../shared/models/filebot.model';
import { FilebotService } from './../../shared/services/filebot.service';
@Component({
  selector: 'app-filebot',
  templateUrl: './filebot.component.html',
  styleUrls: ['./filebot.component.scss'],
})
export class FilebotComponent {

  constructor(private filebotService: FilebotService, private snackBar: MatSnackBar) { }
}
