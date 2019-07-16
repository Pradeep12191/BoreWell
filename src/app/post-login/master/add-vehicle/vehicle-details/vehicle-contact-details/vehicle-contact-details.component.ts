import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';
import { AddVehicleService } from '../../add-vehicle.service';

@Component({
    selector: 'vehicle-contact-details',
    templateUrl: './vehicle-contact-details.component.html',
    styleUrls: ['./vehicle-contact-details.component.scss']
})
export class VehicleContactDetailsComponent {
    @Input() form: FormGroup;

    get contactFormArray() {
        return this.form.get('contacts') as FormArray
    }

    appearance;
    contactTypes = [
        { display: "Owner", value: '1' },
        { display: "Manager", value: '2' },
    ]

    constructor(
        private config: ConfigService,
        private aes: AddVehicleService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }

    addContact() {
        this.contactFormArray.push(this.aes.contactForm())
    }

    removeContact(index){
        this.contactFormArray.removeAt(index)
    }
}