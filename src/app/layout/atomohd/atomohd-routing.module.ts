import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtomohdComponent } from './atomohd.component';

const routes: Routes = [
    {
        path: '', component: AtomohdComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AtomohdRoutingModule {
}
