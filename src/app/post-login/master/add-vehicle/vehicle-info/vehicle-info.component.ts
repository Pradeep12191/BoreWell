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
    types = [
        { value: '1', display: 'Rig' },
        { value: '2', display: 'Support' },
        { value: '3', display: 'Others' },
    ]
    boreSizes = [
        { value: '1', display: '4 1/2' },
        { value: '1', display: '6 1/2' },
    ]
    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }
}