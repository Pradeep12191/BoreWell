import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';
import { PointEntryService } from '../../point-entry.serice';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'point-entry-details',
    templateUrl: './point-entry-details.component.html',
    styleUrls: ['./point-entry-details.component.scss']
})
export class PointEntryDetailsComponent {
    @Input('form') pointEntryForm: FormGroup;
    public appearance;
    get feetsFormArray() {
        return this.pointEntryForm.get('feets') as FormArray
    }

    get totalFeet() {
        return this.pointEntryForm.get('totalFeet').value;
    }

    constructor(
        private fb: FormBuilder,
        private config: ConfigService,
        private pes: PointEntryService,
        private snackBar: MatSnackBar,
        private toastr: ToastrService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }

    public addMoreFeet() {
        const lastIndex = this.feetsFormArray.length - 1;
        const lastFormGroup = this.feetsFormArray.at(lastIndex);
        const lastEndFeet = lastFormGroup.get('endFeet').value;
        const lastPerfeet = lastFormGroup.get('amtPerFeet').value;
        if (lastEndFeet && lastPerfeet) {
            if (+lastEndFeet >= +this.totalFeet) {
                return this.toastr.error('Cannot add more points as End feet reaches Total feet', null, { timeOut: 2000 })
            }
            this.feetsFormArray.push(this.pes.feetFormBuilder((+lastEndFeet + 1).toString()))
        } else {
            this.snackBar.open('Please Fill Fields', null, { duration: 1000 });
        }
    }

    public onTotalFeetInput(event) {
        if (this.feetsFormArray.dirty) {
            this.feetsFormArray.reset([{ startFeet: '0' }])
        }
    }

    calculateFeetAmt(feetCtrl: FormGroup) {
        const startFeet = feetCtrl.get('startFeet').value;
        let endFeet = feetCtrl.get('endFeet').value;
        let amtPerFeet = feetCtrl.get('amtPerFeet').value;
        let totalFeet = endFeet - startFeet;
        let amount = null;

        endFeet = endFeet ? +endFeet : 0;
        amtPerFeet = amtPerFeet ? +amtPerFeet : 0;

        if (totalFeet <= 0) {
            totalFeet = 0;
        }

        amount = totalFeet * amtPerFeet
        if (!totalFeet && !amtPerFeet) {
            feetCtrl.get('amt').setValue('');
        } else {

            feetCtrl.get('amt').setValue(amount.toString());
        }

        this.updateTotalFeetAmount();
    }

    updateTotalFeetAmount() {
        let totalAmount = 0;
        this.feetsFormArray.controls.forEach(ctrl => {
            const feetAmt = ctrl.get('amt').value;
            if (feetAmt) {
                totalAmount += +feetAmt;
            }
        })
        this.pointEntryForm.get('totalFeetAmt').setValue(totalAmount);
        this.updateOverallAmt();
    }

    updateOverallAmt() {
        // overall amount will be the sum of total feet amount, casing amount
        let totalAmt = this.pointEntryForm.get('totalFeetAmt').value;
        let casingAmt = this.pointEntryForm.get('casingFeetAmt').value;
        let overallAmt = 0;
        totalAmt = totalAmt ? +totalAmt : 0;
        casingAmt = casingAmt ? +casingAmt : 0;
        overallAmt = totalAmt + casingAmt;
        this.pointEntryForm.parent.parent.get('otherDetails.overallTotalAmt').setValue(overallAmt.toString())
    }



    validateEndFeet(feetCtrl: FormGroup) {
        const endFeet = feetCtrl.get('endFeet').value;
        if (!this.totalFeet) {
            feetCtrl.get('endFeet').setValue('');
            return this.toastr.error('Please enter Total Feet', null, { timeOut: 2000 })
        }
        if (+endFeet > +this.totalFeet) {
            feetCtrl.get('endFeet').setValue('');
            return this.toastr.error('End feet cannot be more than total Feet', null, { timeOut: 2000 })
        }
    }

    public calculateCasingAmt() {
        let casingDepth = this.pointEntryForm.get('casingDepth').value;
        let casingDepthRate = this.pointEntryForm.get('casingDepthRate').value;
        let casingAmt = 0;

        casingDepth = casingDepth ? +casingDepth : 0;
        casingDepthRate = casingDepthRate ? +casingDepthRate : 0;

        casingAmt = casingDepth * casingDepthRate;

        this.pointEntryForm.get('casingFeetAmt').setValue(casingAmt);
        this.updateOverallAmt();
    }

    public removeLastFeet() {
        this.feetsFormArray.removeAt(this.feetsFormArray.length - 1);
        this.updateTotalFeetAmount();
    }
}