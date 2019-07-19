import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared.module';
import { AddAgentComponent } from './add-agent.component';
import { AddAgentRoutingModule } from './add-agent-routing.module';
import { AgentInfoComponent } from './agent-info/agent-info.component';
import { AgentCommissionParticularsComponent } from './agent-commission-particulars/agent-commission-particulars.component';
import { AgentPointParticularsComponent } from './agent-point-particulars/agent-point-particulars.component';
import { AddAgentService } from './add-agent.service';
import { DirectiveModule } from '../../../directives/directive.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        SharedModule,
        AddAgentRoutingModule,
        DirectiveModule
    ],
    declarations: [
        AddAgentComponent,
        AgentInfoComponent,
        AgentCommissionParticularsComponent,
        AgentPointParticularsComponent
    ],
    providers:[AddAgentService]
})
export class AddAgentModule {

}