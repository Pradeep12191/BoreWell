import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointEntryComponent } from './point-entry.component';
import { PointEntryResolve } from '../../../guards/resolveGuard/point-entry.guard';

const routes: Routes = [
    {
        path: 'pointEntry', component: PointEntryComponent, resolve: {
            data: PointEntryResolve
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PointEntryRoutingModule {

}