import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVehicleComponent } from './add-vehicle.component';
import { StateResolver } from '../../../guards/resolveGuard/state.resolver';

const routes: Routes = [
    {
        path: '', component: AddVehicleComponent, resolve:{
            states: StateResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddVehicleRoutingModule {

}