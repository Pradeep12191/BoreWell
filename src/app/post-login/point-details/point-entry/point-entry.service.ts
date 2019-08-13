import { Injectable } from '@angular/core';
import { PointEntryModule } from './point-entry.module';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatRadioChange, MatSelectChange } from '@angular/material';
import { Agent } from '../../../models/Agent';

@Injectable()
export class PointEntryService {
    public agentChange$ = new Subject<MatSelectChange>();
    public pointOptionChange$ = new Subject<{ optionName: string, data: Agent[] }>();
    constructor(
        private fb: FormBuilder
    ) {

    }

    public agentChangeObs() {
        return this.agentChange$.asObservable();
    }

    public agentChanged(event: MatSelectChange) {
        this.agentChange$.next(event)
    }

    public pointOptionChanged(agentList: { optionName: string, data: Agent[] }) {
        this.pointOptionChange$.next(agentList)
    }

    public pointOptionChangeObs() {
        return this.pointOptionChange$.asObservable();
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

    public bitFormBuilder() {
        return this.fb.group({
            bit: null,
            lastBitScale: null,
            feet: null
        })
    }

    public hammerFormBuilder() {
        return this.fb.group({
            hammer: null,
            lastScale: null,
            hammerScale: null,
            reducedSize: null,
            feet: null
        })
    }
}