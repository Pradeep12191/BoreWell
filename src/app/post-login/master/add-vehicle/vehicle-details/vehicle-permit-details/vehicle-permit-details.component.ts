import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';

@Component({
    selector: 'vehicle-permit-details',
    templateUrl: './vehicle-permit-details.component.html',
    styleUrls: ['./vehicle-permit-details.component.scss']
})
export class VehiclePermitDetailsComponent {
    @Input() form: FormGroup;
    get permitFormArray() {
        return this.form.get('permits') as FormArray
    }
    appearance;
    states = [
        { display: "Gujarat", value: "1" },
        { display: "TamilNadu", value: "2" },
    ];

    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }

}