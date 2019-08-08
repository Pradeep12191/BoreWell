import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAgentComponent } from './view-agent.component';
import { AgentListResolver } from '../../../../guards/resolveGuard/agent/agent-list.resolver';

const routes: Routes = [
    {
        path: '', component: ViewAgentComponent, resolve: {
            agents: AgentListResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewAgentRoutingModule {

}