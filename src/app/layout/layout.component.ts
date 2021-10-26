import { Component } from '@angular/core';
import { SpinnerService } from './../shared/services/spinner.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  showSpinner: boolean = false;

  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.spinnerService.visibility.subscribe(
      (result) => {
        this.showSpinner = result
      }
    );
  }

}
