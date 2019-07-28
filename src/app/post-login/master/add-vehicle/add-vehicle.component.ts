import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddVehicleService } from './add-vehicle.service';
import { ConfigService } from '../../../services/config.service';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: 'add-vehicle.component.html',
    styleUrls: ['add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
    vehicleForm: FormGroup;
    baseUrl;
    url
    constructor(
        private fb: FormBuilder,
        private avs: AddVehicleService,
        private config: ConfigService,
        private http: HttpClient
    ) {
        const vehicleUrl = this.config.getUrl('addVehicle');
        this.baseUrl = this.config.getConfig('apiUrl');
        this.url = this.baseUrl + vehicleUrl;
    }
    

    ngOnInit() {
        this.vehicleForm = this.fb.group({
            info: this.fb.group({
                vehicleType: [null, Validators.required],
                boreSize: [null, Validators.required],
                registrationNumber: [null, Validators.required],
                ownedBy: null,
                registrationAddress: null,
                manufacturer: null,
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
                        oneDay: false,
                        twoDays: false,
                        sevenDays: false,
                        thirtyDays: false
                    })
                }),
                labourInsurance: this.fb.group({
                    companyDetails: null,
                    validUpto: null,
                    remindBefore: this.fb.group({
                        oneDay: false,
                        twoDays: false,
                        sevenDays: false,
                        thirtyDays: false
                    })
                }),
                permits: this.fb.array([this.avs.permitDetailsForm()])
            }),
            cerificate: this.fb.group({
                roadTax: this.avs.certificateForm(),
                fitness: this.avs.certificateForm(),
                pollution: this.avs.certificateForm(),
            })
        });
    }

    save() {
        const formValue = this.vehicleForm.value;
        const vehicleObj = {
            type: formValue.info.vehicleType,
            boreSize: formValue.info.boreSize,
            registrationNumber: formValue.info.registrationNumber,
            ownedBy: formValue.info.ownedBy,
            registrationAddress: formValue.info.registrationAddress,
            manufacturer: formValue.info.manufacturer,
            yearOfManufacture: formValue.info.yearOfManufacture,
            engineNumber: formValue.info.engineNumber,
            chassisNumber: formValue.info.chassisNumber,
            contacts: formValue.details.contacts,
            insurance_companyDetails: formValue.details.insurance.companyDetails,
            insurance_validUpto: formValue.details.insurance.validUpto,
            insurance_oneDay: formValue.details.insurance.remindBefore.oneDay,
            insurance_twoDays: formValue.details.insurance.remindBefore.twoDays,
            insurance_sevenDays: formValue.details.insurance.remindBefore.sevenDays,
            insurance_thirtyDays: formValue.details.insurance.remindBefore.thirtyDays,
            labourInsurance_companyDetails: formValue.details.labourInsurance.companyDetails,
            labourInsurance_validUpto: formValue.details.labourInsurance.validUpto,
            labourInsurance_oneDay: formValue.details.labourInsurance.remindBefore.oneDay,
            labourInsurance_twoDays: formValue.details.labourInsurance.remindBefore.twoDays,
            labourInsurance_sevenDays: formValue.details.labourInsurance.remindBefore.sevenDays,
            labourInsurance_thirtyDays: formValue.details.labourInsurance.remindBefore.thirtyDays,
            permits: formValue.details.permits,
            roadTax_validUpto: formValue.cerificate.roadTax.validUpto,
            roadTax_oneDay: formValue.cerificate.roadTax.remindBefore.oneDay,
            roadTax_twoDays: formValue.cerificate.roadTax.remindBefore.twoDays,
            roadTax_sevenDays: formValue.cerificate.roadTax.remindBefore.sevenDays,
            roadTax_thirtyDays: formValue.cerificate.roadTax.remindBefore.thirtyDays,
            fitness_validUpto: formValue.cerificate.fitness.validUpto,
            fitness_oneDay: formValue.cerificate.fitness.remindBefore.oneDay,
            fitness_twoDays: formValue.cerificate.fitness.remindBefore.twoDays,
            fitness_sevenDays: formValue.cerificate.fitness.remindBefore.sevenDays,
            fitness_thirtyDays: formValue.cerificate.fitness.remindBefore.thirtyDays,
            pollution_validUpto: formValue.cerificate.pollution.validUpto,
            pollution_oneDay: formValue.cerificate.pollution.remindBefore.oneDay,
            pollution_twoDays: formValue.cerificate.pollution.remindBefore.twoDays,
            pollution_sevenDays: formValue.cerificate.pollution.remindBefore.sevenDays,
            pollution_thirtyDays: formValue.cerificate.pollution.remindBefore.thirtyDays,

        }
        console.log(JSON.stringify(vehicleObj, null, 2))
        if (this.url) {
            this.http.post(this.url, vehicleObj).subscribe((response) => {
                if (response) {
                    console.log(JSON.stringify(response, null, 2))
                }else{
                    console.log('No Response')
                }
            });
        }
    }
}