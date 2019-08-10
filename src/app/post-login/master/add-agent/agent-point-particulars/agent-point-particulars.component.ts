import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ConfigService } from '../../../../services/config.service';
import { AddAgentService } from '../add-agent.service';
import { MatSnackBar } from '@angular/material';

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
        private snackBar: MatSnackBar
    ) {
        this.appearance = this.config.getConfig('formAppearance')
    }

    addPoint() {
        const lastIndex = this.pointFormArray.length - 1;
        const lastFormGroup = this.pointFormArray.at(lastIndex);
        const lastEndFeet = lastFormGroup.get('endFeet').value;
        const lastPerfeet = lastFormGroup.get('perFeet').value;
        if (lastEndFeet && lastPerfeet) {
            this.pointFormArray.push(this.aes.buildPointForm((+lastEndFeet + 1).toString()))
        } else {
            this.snackBar.open('Please Fill Fields', null, { duration: 1000 });
        }

    }

    removeLastPoint() {
        this.pointFormArray.removeAt(this.pointFormArray.controls.length - 1)
    }

    calcParticulars(pointCtrl: FormGroup) {
        let endFeet = pointCtrl.get('endFeet').value;
        let perFeet = pointCtrl.get('perFeet').value;
        let startFeet = pointCtrl.get('startFeet').value;
        let particulars = null;
        let amount = null;
        let totalFeet = null;
        endFeet = endFeet ? +endFeet : 0;
        perFeet = perFeet ? +perFeet : 0;
        startFeet = startFeet ? +startFeet : 0;
        if (startFeet > 0) {
            startFeet -= 1;
        }
        totalFeet = endFeet - startFeet;
        if (totalFeet <= 0) {
            totalFeet = 0;
        }
        particulars = totalFeet + '*' + perFeet;
        amount = totalFeet * perFeet;
        if (!totalFeet && !perFeet) {
            pointCtrl.get('particulars').setValue('');
            pointCtrl.get('amount').setValue('');
            return;
        }
        pointCtrl.get('particulars').setValue(particulars);
        pointCtrl.get('amount').setValue(amount.toString());
    }

}