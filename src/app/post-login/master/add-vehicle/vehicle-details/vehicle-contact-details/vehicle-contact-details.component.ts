import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';

@Component({
    selector: 'vehicle-contact-details',
    templateUrl: './vehicle-contact-details.component.html',
    styleUrls: ['./vehicle-contact-details.component.scss']
})
export class VehicleContactDetailsComponent {
    @Input() form: FormGroup;

    appearance;

    constructor(
        private config: ConfigService
    ){
        this.appearance = this.config.getConfig('formAppearance');
    }
}