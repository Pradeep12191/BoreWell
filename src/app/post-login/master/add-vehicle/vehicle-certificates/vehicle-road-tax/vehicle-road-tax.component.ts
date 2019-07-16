import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';

@Component({
    selector: 'vehicle-road-tax',
    templateUrl: './vehicle-road-tax.component.html',
    styleUrls: ['./vehicle-road-tax.component.scss']
})
export class VehicleRoadTaxComponent {
    @Input() form: FormGroup;
    appearance;
    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance')
    }
}