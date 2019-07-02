import { Injectable } from '@angular/core';
import { PointEntryModule } from './point-entry.module';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class PointEntryService {

    constructor(
        private fb: FormBuilder
    ) {

    }

    public feetFormBuilder() {
        return this.fb.group({
            startFeet: [0, Validators.required],
            endFeet: [null, Validators.required],
            amtPerFeet: [null, Validators.required],
            amt: [null, Validators.required]
        })
    }

    public chargeFormBuilder() {
        return this.fb.group({
            charge: null,
            chargeAmt: null
        })
    }
}