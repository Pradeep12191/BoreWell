import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PointEntryService } from '../../point-entry.service';
import { ConfigService } from '../../../../../services/config.service';


@Component({
    selector: 'bit-details',
    templateUrl: './bit-details.component.html',
    styleUrls: ['./bit-details.component.scss']
})
export class BitDetailsComponent implements OnInit {
    @Input('form') bitDetailsForm: FormGroup;
    bits;
    appearance: string

    constructor(
        private pes: PointEntryService,
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }

    get bitFormArray() {
        return this.bitDetailsForm.get('bits') as FormArray
    }

    ngOnInit() {
        this.bits = [
            { value: '1', display: 'BOMI' }
        ]
    }

    calculateTotalRpm() {
        let startRpm = this.bitDetailsForm.get('startRpm').value;
        let endRpm = this.bitDetailsForm.get('endRpm').value;
        let totalFeet = this.bitDetailsForm.parent.get('pointEntry.totalFeet').value;
        let totalRpm = 0;
        let totalFeetPerHour = 0;
        startRpm = startRpm ? +startRpm : 0;
        endRpm = endRpm ? +endRpm : 0;
        totalFeet = totalFeet ? +totalFeet : 0;
        totalRpm = endRpm - startRpm;
        if (totalRpm < 0) {
            totalRpm = 0
        }
        totalFeetPerHour = (Math.round(totalFeet / totalRpm) * 10) / 10;
        if (totalFeetPerHour < 0 || !totalFeetPerHour || totalRpm === 0) {
            totalFeetPerHour = 0
        }
        const totalFeetPerHourStr = totalFeetPerHour.toString() + ' ft/hr'
        
        this.bitDetailsForm.get('totalRpm').setValue(totalRpm.toString());
        this.bitDetailsForm.get('totalFeetPerHour').setValue(totalFeetPerHourStr);
    }

    removeBit(index) {
        this.bitFormArray.removeAt(index);
    }

    addMoreBit() {
        this.bitFormArray.push(this.pes.bitFormBuilder())
    }

}