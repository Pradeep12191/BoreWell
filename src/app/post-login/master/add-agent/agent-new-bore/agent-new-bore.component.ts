import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'agent-new-bore',
    templateUrl: './agent-new-bore.component.html',
    styleUrls: ['./agent-new-bore.component.scss']
})
export class AgentNewBoreComponent{
    @Input('form') newBoreForm:FormGroup
}