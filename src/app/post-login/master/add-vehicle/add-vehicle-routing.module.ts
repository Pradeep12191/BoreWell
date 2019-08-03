import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVehicleComponent } from './add-vehicle.component';
import { StateResolver } from '../../../guards/resolveGuard/state.resolver';
import { VehicleTypeResolver } from '../../../guards/resolveGuard/vehicle/vehicle-type.resolver';
import { BoreSizeResolver } from '../../../guards/resolveGuard/vehicle/bore-size.resolver';

const routes: Routes = [
    {
        path: '', component: AddVehicleComponent, resolve:{
            states: StateResolver,
            vehicleTypes: VehicleTypeResolver,
            boreSizes: BoreSizeResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddVehicleRoutingModule {

}