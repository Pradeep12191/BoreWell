import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class AddAgentService {

    constructor(
        private fb: FormBuilder
    ) {

    }

    buildPointForm(startFeet = '0') {
        return this.fb.group({
            startFeet,
            endFeet: [null, Validators.required],
            perFeet: [null, Validators.required],
            particulars: [null, Validators.required],
            amount: [null, Validators.required]
        })
    }
}