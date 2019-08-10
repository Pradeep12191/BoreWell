import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointEntryComponent } from './point-entry.component';
import { StateResolver } from '../../../guards/resolveGuard/state.resolver';
import { PipeTypeResolver } from '../../../guards/resolveGuard/select-option/pipe-type.resolver';
import { CasingTypeResolver } from '../../../guards/resolveGuard/select-option/casing-type.resolver';
import { BoreTypeResolver } from '../../../guards/resolveGuard/select-option/bore-type.resolver';
import { VehiclesResolver } from '../../../guards/resolveGuard/vehicles.resolver';

const routes: Routes = [
    {
        path: 'pointEntry', component: PointEntryComponent, resolve: {
            rigs : VehiclesResolver,
            states: StateResolver,
            pipeTypes: PipeTypeResolver,
            casingTypes: CasingTypeResolver,
            boreTypes: BoreTypeResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PointEntryRoutingModule {

}