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
import { ElastictranscoderRoutingModule } from './elastictranscoder-routing.module';
import { ElastictranscoderComponent } from './elastictranscoder.component';

@NgModule({
    imports: [
        CommonModule,
        ElastictranscoderRoutingModule,
        MatButtonModule,
        MatDividerModule,
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
        ElastictranscoderComponent,

    ]
})
export class ElastictranscoderModule { }
