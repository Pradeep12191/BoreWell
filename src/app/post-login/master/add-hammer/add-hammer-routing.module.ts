import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHammerComponent } from './add-hammer.component';
import { HammerDistributorListResolver } from '../../../guards/resolveGuard/hammer/hammer-distributor-list.resolver';
import { HammerCompanyListResolver } from '../../../guards/resolveGuard/hammer/hammer-company-list.resolver';
import { VehiclesResolver } from '../../../guards/resolveGuard/vehicles.resolver';

const routes: Routes = [
    {
        path: '', component: AddHammerComponent, resolve: {
            distributors: HammerDistributorListResolver,
            companies: HammerCompanyListResolver,
            rigs: VehiclesResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddHammerRoutingModule {

}