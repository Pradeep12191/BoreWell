import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewHammerComponent } from './view-hammer.component';
import { HammerListResolver } from '../../../../guards/resolveGuard/hammer/hammer-list.resolver';

const routes: Routes = [
    {
        path: '', component: ViewHammerComponent, resolve: {
            hammers: HammerListResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewHammerRoutingModule {

}