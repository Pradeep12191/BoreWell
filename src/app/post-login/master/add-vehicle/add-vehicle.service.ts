import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Injectable()
export class AddVehicleService {
    constructor(private fb: FormBuilder) {

    }
    public contactForm() {
        return this.fb.group({
            type: [null, Validators.required],
            mobileNumber: [null, Validators.required]
        })
    }

    public permitDetailsForm() {
        return this.fb.group({
            state: null,
            validUpto: null,
            remindBefore: this.fb.group({
                oneDay: null,
                twoDays: null,
                sevenDays: null,
                thirtyDays: null
            })
        })
    }

    public certificateForm() {
        return this.fb.group({
            validUpto: null,
            remindBefore: this.fb.group({
                oneDay: null,
                twoDays: null,
                sevenDays: null,
                thirtyDays: null
            })
        })
    }
}