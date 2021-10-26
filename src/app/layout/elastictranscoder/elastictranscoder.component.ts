import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaService } from '../../shared/services/media.service';

@Component({
    selector: 'app-elastictranscoder',
    templateUrl: './elastictranscoder.component.html',
    styleUrls: ['./elastictranscoder.component.scss'],
})
export class ElastictranscoderComponent implements OnInit, OnDestroy {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }


    ngOnDestroy() {

    }


}
