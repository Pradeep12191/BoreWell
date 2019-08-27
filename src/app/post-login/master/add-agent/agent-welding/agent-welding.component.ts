import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../services/config.service';

@Component({
    selector: 'agent-welding',
    templateUrl: './agent-welding.component.html',
    styleUrls: ['./agent-welding.component.scss']
})
export class AgentWeldingComponent {
    @Input('form') weldingForm: FormGroup;
    appearance;

    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }

    public calculateWeldingAmt(){
        const weldingCount = this.weldingForm.get('count').value ? +this.weldingForm.get('count').value : 0;
        const perAmount = this.weldingForm.get('perAmount').value ? +this.weldingForm.get('perAmount').value : 0;

        const totalAmount = weldingCount * perAmount;
        this.weldingForm.get('totalAmount').setValue(totalAmount);
    }
}