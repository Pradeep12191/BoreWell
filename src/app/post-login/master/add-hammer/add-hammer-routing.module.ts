import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHammerComponent } from './add-hammer.component';

const routes: Routes = [
    {
        path: '', component: AddHammerComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddHammerRoutingModule {

}