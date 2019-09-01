import { Component, Input } from '@angular/core';
import { ConfigService } from '../../../../../services/config.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'casing-details-rpm',
    templateUrl: './casing-details-rpm.component.html',
    styleUrls: ['./casing-details-rpm.component.scss']
})
export class CasingDetailsRpmComponent {
    public casingTypes = [
        { name: 'PVC 7 Inch', ctrlName: 'pvc7Inch' },
        { name: 'PVC 10 Inch', ctrlName: 'pvc10Inch' },
        { name: 'PVC 12 Inch', ctrlName: 'pvc12Inch' },
        { name: 'MS, Medium', ctrlName: 'msMedium' },
        { name: 'MS, Heavy', ctrlName: 'msHeavy' },
    ]
    public appearance;
    @Input() form: FormGroup

    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance')
    }
}