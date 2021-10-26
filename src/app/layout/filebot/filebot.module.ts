import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FloatPlayerModule } from '../../shared/modules/float-player/float-player.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from '../layout.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilebotRoutingModule } from './filebot-routing.module';
import { FilebotComponent } from './filebot.component';

@NgModule({
    imports: [
        CommonModule,
        FilebotRoutingModule,
        MatButtonModule,
        MatDividerModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        LayoutModule,
        MatTableModule,
        MatDividerModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        FloatPlayerModule,
        MatDialogModule,
    ],
    declarations: [
        FilebotComponent,

    ]
})
export class FilebotModule { }
