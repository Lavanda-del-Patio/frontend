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
import { FilebotExecutorRoutingModule } from './filebot-executor-routing.module';
import { FilebotExecutorComponent } from './filebot-executor.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FilebotExecutorRoutingModule,
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
        MatCardModule,
        MatGridListModule,
        MatFormFieldModule,
        MatSelectModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        FilebotExecutorComponent,

    ]
})
export class FilebotExecutorModule { }
