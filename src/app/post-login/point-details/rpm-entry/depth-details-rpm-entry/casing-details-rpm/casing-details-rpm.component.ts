import { Component } from '@angular/core';
import { ConfigService } from '../../../../../services/config.service';

@Component({
    selector: 'casing-details-rpm',
    templateUrl: './casing-details-rpm.component.html',
    styleUrls: ['./casing-details-rpm.component.scss']
})
export class CasingDetailsRpmComponent {
    public casingTypes = [
        { name: 'PVC 7 Inch', ctrlName: 'inch7DepthRate' },
        { name: 'PVC 10 Inch', ctrlName: 'inch10DepthRate' },
        { name: 'PVC 12 Inch', ctrlName: 'inch12DepthRate' },
        { name: 'MS, Medium', ctrlName: 'msMediumDepthRate' },
        { name: 'MS, Heavy', ctrlName: 'msHeavyDepthRate' },
    ]
    public appearance;

    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance')
    }
}