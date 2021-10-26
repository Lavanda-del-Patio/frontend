import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElastictranscoderComponent } from './elastictranscoder.component';

const routes: Routes = [
    {
        path: '', component: ElastictranscoderComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ElastictranscoderRoutingModule {
}
