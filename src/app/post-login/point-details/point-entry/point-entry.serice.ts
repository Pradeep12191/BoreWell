import { Injectable } from '@angular/core';
import { PointEntryModule } from './point-entry.module';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class PointEntryService {

    constructor(
        private fb: FormBuilder
    ) {

    }

    public feetFormBuilder(startFeet = '0') {
        return this.fb.group({
            startFeet,
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

    public bitFormBuilder(){
        return this.fb.group({
            bit: null,
            lastBitScale: null,
            feet: null
        })
    }

    public hammerFormBuilder(){
        return this.fb.group({
            hammer: [null, Validators.required],
            lastScale: [null, Validators.required],
            hammerScale: [null, Validators.required],
            reducedSize: [null, Validators.required],
            feet: [null, Validators.required]
        })
    }
}