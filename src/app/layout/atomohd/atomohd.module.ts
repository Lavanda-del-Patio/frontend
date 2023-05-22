import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from './../../angular-material.module';
import { FloatPlayerModule } from '../../shared/modules/float-player/float-player.module';
import { LayoutModule } from '../layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomohdComponent } from './atomohd.component';
import { AtomohdRoutingModule } from './atomohd-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AtomohdRoutingModule,
        AngularMaterialModule,
        LayoutModule,
        FloatPlayerModule,
        FlexLayoutModule
    ],
    declarations: [
        AtomohdComponent,
    ]
})
export class AtomohdModule { }
