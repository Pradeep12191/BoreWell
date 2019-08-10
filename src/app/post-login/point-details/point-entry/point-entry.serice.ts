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
            endFeet: '',
            amtPerFeet: '',
            amt: ''
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
            hammer: null,
            lastScale: null,
            hammerScale: null,
            reducedSize: null,
            feet: null
        })
    }
}