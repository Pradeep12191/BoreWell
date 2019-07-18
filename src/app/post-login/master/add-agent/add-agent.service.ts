import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable()
export class AddAgentService {

    constructor(
        private fb: FormBuilder
    ) {

    }

    buildPointForm() {
        return this.fb.group({
            startFeet: 0,
            endFeet: null,
            perFeet: null,
            particulars: null,
            amount: null
        })
    }
}