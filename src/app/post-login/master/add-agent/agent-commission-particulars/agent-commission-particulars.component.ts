import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../services/config.service';

@Component({
    selector: 'agent-commission-particulars',
    templateUrl: 'agent-commission-particulars.component.html',
    styleUrls: ['agent-commission-particulars.component.scss']
})
export class AgentCommissionParticularsComponent {
    @Input() form: FormGroup;
    appearance;
    types = [
        { value: '1', display: 'Amount' },
        { value: '2', display: 'Percentage' },
    ];
    casingTypes = [
        { value: '1', display: 'Own' },
        { value: '2', display: 'Agent' },
    ];
    casingPaymentTypes =  [
        { value: '1', display: 'Amount' },
        { value: '2', display: 'Percentage' },
    ];
    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance')
    }
}