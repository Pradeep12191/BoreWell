import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../../../../services/config.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RpmEntryService } from '../../rpm-entry.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rpm-details-rpm-entry',
    templateUrl: './rpm-details-rpm-entry.component.html',
    styleUrls: ['./rpm-details-rpm-entry.component.scss']
})
export class RpmDetailsRpmEntryComponent implements OnInit, OnDestroy {
    public appearance;
    @Input() form: FormGroup;
    boreChangeSubscription: Subscription;
    boreType = 'newBore'
    constructor(
        private config: ConfigService,
        private _fb: FormBuilder,
        private res: RpmEntryService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }

    public ngOnInit() {
        // depth form default add depth details for new Bore
        this.form.addControl('drilling', this.buildNewBoreForm());
        this.boreChangeSubscription = this.res.boreChangeObs().subscribe(boreType => {
            this.boreType = boreType;
            if (boreType === 'newBore') {
                (this.form.get('drilling') as FormGroup).removeControl('start');
                (this.form.get('drilling') as FormGroup).removeControl('end');
                (this.form.get('drilling') as FormGroup).removeControl('flushing');
                return;
            }
            (this.form.get('drilling') as FormGroup).addControl('start', new FormControl(''));
            (this.form.get('drilling') as FormGroup).addControl('end', new FormControl(''));
            (this.form.get('drilling') as FormGroup).addControl('flushing', new FormControl(''));
        })
    }

    public ngOnDestroy() {
        if (this.boreChangeSubscription) { this.boreChangeSubscription.unsubscribe(); }
    }

    buildNewBoreForm() {
        return this._fb.group({
            depth: ''
        })
    }

    buildReBoreForm() {
        return this._fb.group({
            depth: '',
            start: '',
            end: '',
            flushing: ''
        })
    }
}