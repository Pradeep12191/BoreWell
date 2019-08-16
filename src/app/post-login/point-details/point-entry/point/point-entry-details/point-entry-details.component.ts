import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';
import { PointEntryService } from '../../point-entry.service';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Subject } from 'rxjs';
import { Agent } from '../../../../../models/Agent';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'point-entry-details',
    templateUrl: './point-entry-details.component.html',
    styleUrls: ['./point-entry-details.component.scss']
})
export class PointEntryDetailsComponent implements OnDestroy {
    @Input('form') pointEntryForm: FormGroup;
    agentChangeSubcsription: Subscription;
    pointOptionChangeSubscription: Subscription;
    totalFeetAmtInputSubscription: Subscription;
    public appearance;
    public agentList: Agent[];
    public agentNames;
    public selectedAgent: Agent;
    public totalFeetAmtInput$ = new Subject();
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
        this.agentChangeSubcsription = this.pes.agentChangeObs().subscribe((event) => {
            console.log(event.value);

            this.selectedAgent = this.agentList.find((agent) => agent.name === event.value);
            const feetPoints = this.getFeetPointsFromAgent();

            // set feets from selected agent
            this.feetsFormArray.setValue([feetPoints[0]]);
            if (feetPoints.length > 1) {
                feetPoints.forEach((feetPoint, index) => {
                    if (index === 0) return;
                    this.feetsFormArray.push(this.fb.group(feetPoint))
                })
                this.updateFeetsFormArray();
            }
        })
        this.pointOptionChangeSubscription = this.pes.pointOptionChangeObs().subscribe(({ optionName, data }) => {
            if (optionName === 'self') {
                // reset on radio option changed to self
                this.selectedAgent = null;
                this.pes.removeControls(this.feetsFormArray)
                this.feetsFormArray.reset([{ startFeet: '0' }]);
                this.pointEntryForm.get('totalFeet').reset()
            }
            this.agentList = data;
        })

        this.totalFeetAmtInputSubscription = this.totalFeetAmtInput$.asObservable().pipe(distinctUntilChanged(), debounceTime(500)).subscribe(() => {
            this.updateFeetsFormArray();
            this.updateTotalFeetAmount();
        })
    }

    getFeetPointsFromAgent() {
        const points = this.selectedAgent.points.filter(point => point);
        this.selectedAgent.points.filter(point => point);
        const feetPoints = points.map(point => {
            const endFeet = point.endFeet ? +  point.endFeet : 0;
            let startFeet = point.startFeet ? +point.startFeet : 0;
            if (startFeet > 0) {
                startFeet -= 1;
            }
            const totalFeet = endFeet - startFeet;
            return {
                startFeet: point.startFeet,
                endFeet: point.endFeet,
                totalFeet,
                amtPerFeet: point.perFeet,
                amt: point.amount,
                isDeleted: false
            }
        })
        return feetPoints;
    }

    ngOnDestroy() {
        if (this.agentChangeSubcsription) { this.agentChangeSubcsription.unsubscribe() }
        if (this.pointOptionChangeSubscription) { this.pointOptionChangeSubscription.unsubscribe() }
        if (this.totalFeetAmtInputSubscription) { this.totalFeetAmtInputSubscription.unsubscribe() }
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

        if (this.selectedAgent) {
            this.totalFeetAmtInput$.next(event);
            return;
        }

        if (this.feetsFormArray.dirty) {
            this.pes.removeControls(this.feetsFormArray)
            this.feetsFormArray.reset([{ startFeet: '0' }])
        }
    }

    // feet amount will the amount per feet * total feet (start feet - end feet)
    calculateFeetAmt(feetCtrl: FormGroup, ctrlIndex: number, ctrlName: string) {
        let startFeet = feetCtrl.get('startFeet').value;
        let endFeet = feetCtrl.get('endFeet').value;
        let amtPerFeet = feetCtrl.get('amtPerFeet').value;
        let amount = null;

        endFeet = endFeet ? +endFeet : 0;
        amtPerFeet = amtPerFeet ? +amtPerFeet : 0;
        startFeet = startFeet ? +startFeet : 0;

        if (startFeet > 0) {
            startFeet = startFeet - 1;
        }
        let totalFeet = endFeet - startFeet;

        if (totalFeet <= 0) {
            totalFeet = 0;
        }
        feetCtrl.get('totalFeet').setValue(totalFeet.toString());

        amount = totalFeet * amtPerFeet
        if (!totalFeet && !amtPerFeet) {
            feetCtrl.get('amt').setValue('');
        } else {

            feetCtrl.get('amt').setValue(amount.toString());
        }

        this.updateTotalFeetAmount();
        if (ctrlName !== 'amtPerFeet') {
            this.pes.removeControls(this.feetsFormArray, ctrlIndex + 1);
        }

    }

    setFeetsFormArray() {
        const feetPoints = this.getFeetPointsFromAgent();

        // set feets from selected agent
        this.feetsFormArray.setValue(feetPoints);
        // if (feetPoints.length > 1) {
        //     feetPoints.forEach((feetPoint, index) => {
        //         if (index === 0) return;
        //         this.feetsFormArray.push(this.fb.group(feetPoint))
        //     })
        // }
    }

    // on total feet change - remove the feets that are greated than total feet
    // set the last matched feet point's end feet to totalFeet
    updateFeetsFormArray() {
        const totalFeet = this.totalFeet ? +this.totalFeet : 0;
        const points = this.getFeetPointsFromAgent();
        if (totalFeet === 0) {
            // reset entire form Array
            this.setFeetsFormArray();
            return;
        }
        this.feetsFormArray.controls.forEach((ctrl, index) => {
            // reset to actual value ----
            const currentEndFeet = points[index].endFeet ? + points[index].endFeet : 0;
            const currentTotlalPointFeet = points[index].totalFeet;
            const currentAmt = points[index].amt;
            // reset ends here ----

            const endFeet = ctrl.get('endFeet').value ? +ctrl.get('endFeet').value : 0;
            let startFeet = ctrl.get('startFeet').value ? +ctrl.get('startFeet').value : 0;
            const amtPerFeet = ctrl.get('amtPerFeet').value ? +ctrl.get('amtPerFeet').value : 0;
            let feetRange = 0;
            let amt = 0;


            if (startFeet > 0) {
                startFeet -= 1;
            }





            if (totalFeet >= currentEndFeet) {
                // do nothing - reset
                if (ctrl.get('isDeleted').value) {
                    ctrl.get('isDeleted').setValue(false);
                }
                ctrl.get('endFeet').setValue(currentEndFeet.toString());
                ctrl.get('totalFeet').setValue(currentTotlalPointFeet);
                ctrl.get('amt').setValue(currentAmt);
            } else if (totalFeet > startFeet && totalFeet <= endFeet) {
                // update
                if (ctrl.get('isDeleted').value) {
                    ctrl.get('isDeleted').setValue(false);
                }
                ctrl.get('endFeet').setValue(totalFeet.toString());
                feetRange = totalFeet - startFeet;
                if (feetRange <= 0) {
                    feetRange = 0;
                }

                amt = feetRange * amtPerFeet;
                ctrl.get('totalFeet').setValue(feetRange.toString());
                ctrl.get('amt').setValue(amt.toString());
            } else {
                if (index !== 0) {
                    ctrl.get('isDeleted').setValue(true);
                }
            }

        })
    }

    // total Feet amount calulation.
    // sum up the each feet amt till the total feet falls into the range (start feet - end feet)
    // from there calculate the remaining feet and add to the sum
    updateTotalFeetAmount() {
        let totalAmount = 0;
        this.feetsFormArray.controls.forEach(ctrl => {
            if (ctrl.get('isDeleted').value) {
                return;
            }
            const feetAmt = +ctrl.get('amt').value;
            const endFeet = +ctrl.get('endFeet').value;
            let startFeet = +ctrl.get('startFeet').value;
            const amtPerFeet = +ctrl.get('amtPerFeet').value;
            const totalFeet = +this.totalFeet;
            // start feet always starts with one less than its actual value
            // for eg : 0 - 100 = 100
            //          101 - 200 = 100 (this should be 100) as 0 - 200 will be 200
            if (startFeet > 0) {
                startFeet -= 1;
            }
            if (totalFeet >= +endFeet) {
                if (feetAmt) {
                    totalAmount += +feetAmt;
                }
            } else if (totalFeet > startFeet && totalFeet <= endFeet) {
                const remainingFeet = totalFeet - startFeet
                totalAmount += remainingFeet * amtPerFeet
            }

        })
        this.pointEntryForm.get('totalFeetAmt').setValue(totalAmount.toString());
        this.updateOverallAmt();
    }

    updateOverallAmt() {
        // overall amount will be the sum of total feet amount, casing amount, other charges
        let totalAmt = this.pointEntryForm.get('totalFeetAmt').value;
        let casingAmt = this.pointEntryForm.get('casingFeetAmt').value;
        let otherCharges = this.pointEntryForm.get('allowance').value
        let overallAmt = 0;
        totalAmt = totalAmt ? +totalAmt : 0;
        casingAmt = casingAmt ? +casingAmt : 0;
        otherCharges = otherCharges ? +otherCharges : 0;
        overallAmt = totalAmt + casingAmt + otherCharges;
        this.pointEntryForm.parent.parent.get('otherDetails.overallTotalAmt').setValue(overallAmt.toString())
    }


    // self
    // on change of end feet, if the entered end feet is greater than total feet
    // if total feet amount is not entered.
    validateEndFeet(feetCtrl: FormGroup) {
        const endFeet = feetCtrl.get('endFeet').value;
        if (!this.totalFeet) {
            feetCtrl.get('endFeet').setValue('');
            feetCtrl.get('totalFeet').setValue('');
            return this.toastr.error('Please enter Total Feet', null, { timeOut: 2000 })
        }
        if (+endFeet > +this.totalFeet) {
            feetCtrl.get('endFeet').setValue('');
            feetCtrl.get('amt').setValue('');
            this.updateTotalFeetAmount()
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

        this.pointEntryForm.get('casingFeetAmt').setValue(casingAmt.toString());
        this.updateOverallAmt();
    }

    public removeLastFeet() {
        this.feetsFormArray.removeAt(this.feetsFormArray.length - 1);
        this.updateTotalFeetAmount();
    }
}