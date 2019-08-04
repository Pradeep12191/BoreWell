import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewVehicleComponent } from './view-vehicle.component';
import { VehicleListResolver } from '../../../../guards/resolveGuard/vehicle/vehicle-list.resolver';

const routes: Routes = [
    {
        path: '', component: ViewVehicleComponent, resolve: {
            vehicles: VehicleListResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewVehicleRoutingModule {

}