import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointEntryComponent } from './point-entry.component';

const routes: Routes = [
    { path: 'pointEntry', component: PointEntryComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PointEntryRoutingModule {

}