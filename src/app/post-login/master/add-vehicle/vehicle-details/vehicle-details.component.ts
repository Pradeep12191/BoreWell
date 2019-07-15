import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../services/config.service';

@Component({
    selector: 'vehicle-details',
    templateUrl: './vehicle-details.component.html',
    styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent {
    @Input() form: FormGroup;

    appearance;

    constructor(
        private config: ConfigService
    ){
        this.appearance = this.config.getConfig('formAppearance');
    }
}