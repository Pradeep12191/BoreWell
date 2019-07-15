import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddVehicleService } from './add-vehicle.service';

@Component({
    templateUrl: 'add-vehicle.component.html',
    styleUrls: ['add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
    vehicleForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private avs: AddVehicleService
    ) {

    }

    ngOnInit() {
        this.vehicleForm = this.fb.group({
            info: this.fb.group({
                vehicleType: [null, Validators.required],
                boreSize: [null, Validators.required],
                registrationNumber: [null, Validators.required],
                ownedBy: null,
                registrationAddress: null,
                manufacture: null,
                yearOfManufacture: null,
                engineNumber: null,
                chassisNumber: null
            }),
            details: this.fb.group({
                contacts: this.fb.array([this.avs.contactForm()]),
                insurance: this.fb.group({
                    companyDetails: null,
                    validUpto: null,
                    remindBefore: this.fb.group({
                        oneDay: null,
                        twoDays: null,
                        sevenDays: null,
                        thirtyDays: null
                    })
                }),
                labourInsurance: this.fb.group({
                    companyDetails: null,
                    validUpto: null,
                    remindBefore: this.fb.group({
                        oneDay: null,
                        twoDays: null,
                        sevenDays: null,
                        thirtyDays: null
                    })
                }),
                permit: this.fb.array([this.avs.permitDetailsForm()])
            }),
            cerificate: this.fb.group({
                roadTax: this.avs.certificateForm(),
                fitness: this.avs.certificateForm(),
                pollution: this.avs.certificateForm(),
            })
        });
    }

    pu
}