import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';

@Component({
    selector: 'vehicle-pollution-certificate',
    templateUrl: './vehicle-pollution-certificate.component.html',
    styleUrls: ['./vehicle-pollution-certificate.component.scss']
})
export class VehiclePollutionCertificatesComponent {
    @Input() form: FormGroup;
    appearance;
    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance')
    }
}