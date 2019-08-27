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
import { CasingDetailsComponent } from './casing-details/casing-details.component';
import { AgentReBoreComponent } from './agent-re-bore/agent-re-bore.component';
import { AgentNewBoreComponent } from './agent-new-bore/agent-new-bore.component';
import { AgentWeldingComponent } from './agent-welding/agent-welding.component';
import { AgentOtherChargesComponent } from './agent-other-charges/agent-other-charges.component';
import { ReBoreChargeComponent } from './agent-re-bore/re-bore-charge/re-bore-charge.component';


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
        AgentPointParticularsComponent,
        AgentReBoreComponent,
        AgentNewBoreComponent,
        AgentWeldingComponent,
        AgentOtherChargesComponent,
        ReBoreChargeComponent,
        CasingDetailsComponent,
    ],
    providers:[AddAgentService]
})
export class AddAgentModule {

}