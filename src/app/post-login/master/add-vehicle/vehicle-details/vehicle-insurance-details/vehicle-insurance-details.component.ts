import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';
import { AddVehicleService } from '../../add-vehicle.service';

@Component({
    selector: 'vehicle-insurance-details',
    templateUrl: './vehicle-insurance-details.component.html',
    styleUrls: ['./vehicle-insurance-details.component.scss']
})
export class VehicleInsuranceDetailsComponent {
    @Input() form: FormGroup;

    appearance;

    constructor(
        private config: ConfigService,
        private aes: AddVehicleService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }

}