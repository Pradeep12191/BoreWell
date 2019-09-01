import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';


@Injectable()
export class RpmEntryService {
    private boreChange$ = new Subject<any>();
    private agentChange$ = new Subject<any>();

    constructor(
        private _fb: FormBuilder
    ) {

    }

    agentChange(agent) {
        this.agentChange$.next(agent);
    }

    agentChangeObs() {
        return this.agentChange$.asObservable();
    }

    boreChange(boreName) {
        this.boreChange$.next(boreName);
    }

    boreChangeObs() {
        return this.boreChange$.asObservable();
    }

    buildBitForm() {
        return this._fb.group({
            no: '',
            size: '',
            depth: ''
        })
    }
}