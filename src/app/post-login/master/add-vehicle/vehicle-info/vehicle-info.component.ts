import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../services/config.service';

@Component({
    selector: 'vehicle-info',
    templateUrl: './vehicle-info.component.html',
    styleUrls: ['./vehicle-info.component.scss']
})
export class VehicleInfoComponent {
    @Input() form: FormGroup;

    appearance;

    constructor(
        private config: ConfigService
    ){
        this.appearance = this.config.getConfig('formAppearance');
    }
}