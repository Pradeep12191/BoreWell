import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgentComponent } from './add-agent.component';
import { StateResolver } from '../../../guards/resolveGuard/state.resolver';
import { AgentTypeResolver } from '../../../guards/resolveGuard/select-option/agent-type.resolver';
import { CasingPaymentTypeResolver } from '../../../guards/resolveGuard/select-option/casing-payment-type.resolver';
import { CasingCommissionTypeResolver } from '../../../guards/resolveGuard/select-option/casing-commission-type.resolver';
import { DrillingCommissionTypeResolver } from '../../../guards/resolveGuard/select-option/drilling-commission-type.resolver';

const routes: Routes = [
    {
        path: '', component: AddAgentComponent, resolve:{
            states: StateResolver,
            agentTypes: AgentTypeResolver,
            casingPayments: CasingPaymentTypeResolver,
            casingCommissions: CasingCommissionTypeResolver,
            drillingCommissions: DrillingCommissionTypeResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddAgentRoutingModule {

}