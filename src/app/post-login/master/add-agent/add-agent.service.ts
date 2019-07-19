import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable()
export class AddAgentService {

    constructor(
        private fb: FormBuilder
    ) {

    }

    buildPointForm(startFeet = 0) {
        return this.fb.group({
            startFeet,
            endFeet: null,
            perFeet: null,
            particulars: null,
            amount: null
        })
    }
}