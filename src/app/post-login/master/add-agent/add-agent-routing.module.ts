import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgentComponent } from './add-agent.component';
import { StateResolver } from '../../../guards/resolveGuard/state.resolver';

const routes: Routes = [
    {
        path: '', component: AddAgentComponent, resolve:{
            states: StateResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddAgentRoutingModule {

}