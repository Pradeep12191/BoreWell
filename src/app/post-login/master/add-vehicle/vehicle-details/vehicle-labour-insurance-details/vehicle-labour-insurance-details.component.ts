import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';
import { AddVehicleService } from '../../add-vehicle.service';

@Component({
    selector: 'vehicle-labour-insurance-details',
    templateUrl: './vehicle-labour-insurance-details.component.html',
    styleUrls: ['./vehicle-labour-insurance-details.component.scss']
})
export class VehicleLabourInsuranceDetailsComponent {
    @Input() form: FormGroup;

    appearance;

    constructor(
        private config: ConfigService,
        private aes: AddVehicleService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }

}