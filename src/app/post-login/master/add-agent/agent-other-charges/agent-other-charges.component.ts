import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../services/config.service';

@Component({
    selector: 'agent-other-charges',
    templateUrl: './agent-other-charges.component.html',
    styleUrls: ['./agent-other-charges.component.scss']
})
export class AgentOtherChargesComponent {
    @Input('form') otherChargesForm: FormGroup;
    appearance;
    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }
}