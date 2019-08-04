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
            state: [null, Validators.required],
            validUpto: [null, Validators.required],
            remindBefore: this.fb.group({
                oneDay: false,
                twoDays: false,
                sevenDays: false,
                thirtyDays: false
            })
        })
    }

    public certificateForm() {
        return this.fb.group({
            validUpto: null,
            remindBefore: this.fb.group({
                oneDay: false,
                twoDays: false,
                sevenDays: false,
                thirtyDays: false
            })
        })
    }
}