import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ConfigService } from '../../../../services/config.service';
import { AddAgentService } from '../add-agent.service';

@Component({
    selector: 'agent-point-particulars',
    templateUrl: 'agent-point-particulars.component.html',
    styleUrls: ['agent-point-particulars.component.scss']
})
export class AgentPointParticularsComponent {
    @Input() form: FormGroup;
    appearance;
    get pointFormArray() {
        return this.form.get('particulars') as FormArray
    }
    constructor(
        private config: ConfigService,
        private aes: AddAgentService,
    ) {
        this.appearance = this.config.getConfig('formAppearance')
    }

    addPoint() {
        this.pointFormArray.push(this.aes.buildPointForm())
    }

    removeLastPoint() {
        this.pointFormArray.removeAt(this.pointFormArray.controls.length - 1)
    }
}