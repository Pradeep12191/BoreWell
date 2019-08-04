import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVehicleComponent } from './add-vehicle.component';
import { StateResolver } from '../../../guards/resolveGuard/state.resolver';
import { VehicleTypeResolver } from '../../../guards/resolveGuard/vehicle/vehicle-type.resolver';
import { BoreSizeResolver } from '../../../guards/resolveGuard/vehicle/bore-size.resolver';
import { ContactTypeResolver } from '../../../guards/resolveGuard/select-option/contact-type.resolver.';

const routes: Routes = [
    {
        path: '', component: AddVehicleComponent, resolve:{
            states: StateResolver,
            vehicleTypes: VehicleTypeResolver,
            boreSizes: BoreSizeResolver,
            contactTypes: ContactTypeResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddVehicleRoutingModule {

}