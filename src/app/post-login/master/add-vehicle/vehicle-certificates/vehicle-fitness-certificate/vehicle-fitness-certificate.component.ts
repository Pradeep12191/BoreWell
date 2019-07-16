import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';

@Component({
    selector: 'vehicle-fitness-certificate',
    templateUrl: './vehicle-fitness-certificate.component.html',
    styleUrls: ['./vehicle-fitness-certificate.component.scss']
})
export class VehicleFitnessCertificatesComponent {
    @Input() form: FormGroup;
    appearance;
    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance')
    }
}