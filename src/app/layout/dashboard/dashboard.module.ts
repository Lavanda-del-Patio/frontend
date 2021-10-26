import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from './../../angular-material.module';
import { FloatPlayerModule } from '../../shared/modules/float-player/float-player.module';
import { LayoutModule } from '../layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        AngularMaterialModule,
        LayoutModule,
        FloatPlayerModule,
        FlexLayoutModule
    ],
    declarations: [
        DashboardComponent,
    ]
})
export class DashboardModule { }
