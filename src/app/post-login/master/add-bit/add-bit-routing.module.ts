import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBitComponent } from './add-bit.component';

const routes: Routes = [
    {
        path: '', component: AddBitComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddBitRoutingModule {

}