import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBitComponent } from './view-bit.component';
import { BitListResolver } from '../../../../guards/resolveGuard/bit/bit-list.resolver';

const routes: Routes = [
    {
        path: '', component: ViewBitComponent, resolve: {
            bits: BitListResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewBitRoutingModule {

}