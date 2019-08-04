import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';
import { AddVehicleService } from '../../add-vehicle.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'vehicle-contact-details',
    templateUrl: './vehicle-contact-details.component.html',
    styleUrls: ['./vehicle-contact-details.component.scss']
})
export class VehicleContactDetailsComponent {
    @Input() form: FormGroup;
    routeSubscription: Subscription;

    get contactFormArray() {
        return this.form.get('contacts') as FormArray
    }

    appearance;
    contactTypes;

    constructor(
        private config: ConfigService,
        private aes: AddVehicleService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        this.appearance = this.config.getConfig('formAppearance');
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data) {
                if (data && data.contactTypes) {
                    this.contactTypes = data.contactTypes;
                }
            }
        })
    }

    addContact() {
        if (this.contactFormArray.invalid) {
            return this.snackBar.open('Please Fill Fields', null, { duration: 1000 })
        }
        this.contactFormArray.push(this.aes.contactForm())
    }

    removeContact(index) {
        this.contactFormArray.removeAt(index)
    }
}