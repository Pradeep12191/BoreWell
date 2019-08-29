import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RpmEntryComponent } from './rpm-entry.component';
import { AgentListResolver } from '../../../guards/resolveGuard/agent/agent-list.resolver';


@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'rpmEntry', component: RpmEntryComponent, resolve: {
                agents: AgentListResolver
            }
        }
    ])],
    exports: [RouterModule]
})
export class RpmEntryRoutingModule {

}