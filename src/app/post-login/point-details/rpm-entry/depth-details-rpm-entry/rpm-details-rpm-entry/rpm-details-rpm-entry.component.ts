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
        });
    }

    public ngOnDestroy() {
        if (this.boreChangeSubscription) { this.boreChangeSubscription.unsubscribe(); }
    }

    calcTotalRpm() {
        const startRpm = this.form.get('rpm.start').value ? +this.form.get('rpm.start').value : 0;
        const endRpm = this.form.get('rpm.end').value ? +this.form.get('rpm.end').value : 0;
        const totalDepth = this.form.get('drilling.depth').value ? +this.form.get('drilling.depth').value : 0;

        let totalRpm = 0;
        let feetage = 0;
        totalRpm = endRpm - startRpm;

        if (totalRpm > 0) {
            this.form.get('rpm.total').setValue(totalRpm.toString())
        } else {
            this.form.get('rpm.total').setValue('0')
        }

        if (totalRpm > 0 && totalDepth > 0) {
            feetage = Math.round((totalDepth / totalRpm) * 1000) / 1000;
        }
        this.form.get('feetage').setValue(feetage.toString());
    }

    calcDepthRange() {
        const flushingDepth = this.form.get('drilling.flushing').value ? +this.form.get('drilling.flushing').value : 0;
        const totalDepth = this.form.get('drilling.end').value ? +this.form.get('drilling.end').value : 0;

        let drillingStart = 0;
        let totalDrilling = totalDepth - flushingDepth;

        if (flushingDepth) {
            drillingStart = flushingDepth + 1;
        }

        if (totalDrilling > 0) {
            this.form.get('drilling.depth').setValue(totalDrilling.toString());
        } else {
            this.form.get('drilling.depth').setValue('0');
        }

        const startDepthCtrl = this.form.get('drilling.start')
        startDepthCtrl.setValue(drillingStart.toString());
    }

    calcHammerDepth() {
        this.res.casingChanged()
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