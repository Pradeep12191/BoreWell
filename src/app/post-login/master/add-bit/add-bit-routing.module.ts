import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBitComponent } from './add-bit.component';
import { BitSizeResolver } from '../../../guards/resolveGuard/bit-size-list.resolver';
import { DistributorsResolver } from '../../../guards/resolveGuard/distributors.resolver';
import { VehiclesResolver } from '../../../guards/resolveGuard/vehicles.resolver';

const routes: Routes = [
    {
        path: '', component: AddBitComponent, resolve: {
            bitSizes: BitSizeResolver,
            distributors: DistributorsResolver,
            vehicles: VehiclesResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddBitRoutingModule {

}