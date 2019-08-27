import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../services/config.service';

@Component({
    selector: 'casing-details',
    templateUrl: './casing-details.component.html',
    styleUrls: ['./casing-details.component.scss']
})
export class CasingDetailsComponent {
    @Input('form') casingDetailsForm: FormGroup;
    appearance;
    public casingTypes = [
        { name: 'PVC 7 Inch', ctrlName: 'inch7DepthRate' },
        { name: 'PVC 10 Inch', ctrlName: 'inch10DepthRate' },
        { name: 'PVC 12 Inch', ctrlName: 'inch12DepthRate' },
        { name: 'MS, Medium', ctrlName: 'msMediumDepthRate' },
        { name: 'MS, Heavy', ctrlName: 'msHeavyDepthRate' },
    ]
    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }

    calcTotalCasingAmount(groupName) {
        const group = this.casingDetailsForm.get(groupName);
        if (group) {
            const depth = group.get('depth').value ? + group.get('depth').value : 0;
            const depthRate = group.get('depthRate').value ? + group.get('depthRate').value : 0;
            const totalAmt = depth * depthRate;
            group.get('amount').setValue(totalAmt);
        }
    }

}