import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RpmEntryComponent } from './rpm-entry.component';
import { AgentListResolver } from '../../../guards/resolveGuard/agent/agent-list.resolver';
import { VehicleListResolver } from 'src/app/guards/resolveGuard/vehicle/vehicle-list.resolver';
import { VehiclesResolver } from 'src/app/guards/resolveGuard/vehicles.resolver';


@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'rpmEntry', component: RpmEntryComponent, resolve: {
                agents: AgentListResolver,
                rigs: VehiclesResolver
            }
        }
    ])],
    exports: [RouterModule]
})
export class RpmEntryRoutingModule {

}