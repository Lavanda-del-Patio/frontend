import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElasticTranscoderMediaComponent } from './elastictranscoder-media.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ElasticTranscoderMediaRoutingModule } from './elastictranscoder-media-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        ElasticTranscoderMediaRoutingModule
    ],
    declarations: [ElasticTranscoderMediaComponent]
})
export class ElasticTranscoderMediaModule { }
