import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { SharedModule } from '../../../../shared.module';
import { ExpandTableModule } from '../../../../expand-table/expand-table.module';
import { ViewAgentComponent } from './view-agent.component';
import { AgentListResolver } from '../../../../guards/resolveGuard/agent/agent-list.resolver';
import { ViewAgentRoutingModule } from './view-agent-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        SharedModule,
        ViewAgentRoutingModule,
        ExpandTableModule
    ],
    declarations: [
        ViewAgentComponent
    ],
    providers: [
        AgentListResolver
    ]
})
export class ViewAgentModule {

}