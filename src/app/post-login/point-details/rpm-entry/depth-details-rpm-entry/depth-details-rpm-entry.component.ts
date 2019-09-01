import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RpmEntryService } from '../rpm-entry.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'depth-details-rpm',
    templateUrl: './depth-details-rpm-entry.component.html',
    styleUrls: ['./depth-details-rpm-entry.component.scss']
})
export class DepthDetailsRpmEntryComponent implements OnInit, OnDestroy {
    @Input() form: FormGroup;
    casingChangeSubcription: Subscription;
    constructor(
        private res: RpmEntryService
    ) {

    }

    ngOnInit() {
        this.res.casingChangeObs().subscribe(() => {
            this.calcHammerDepth();
        })
    }

    ngOnDestroy() {
        if (this.casingChangeSubcription) { this.casingChangeSubcription.unsubscribe(); }
    }

    calcHammerDepth() {
        const pvc7InchDepth = this.form.get('casing.pvc7Inch').value ? +this.form.get('casing.pvc7Inch').value : 0;
        const pvc10InchDepth = this.form.get('casing.pvc10Inch').value ? +this.form.get('casing.pvc10Inch').value : 0;
        const pvc12InchDepth = this.form.get('casing.pvc12Inch').value ? +this.form.get('casing.pvc12Inch').value : 0;
        const msMediumDepth = this.form.get('casing.msMedium').value ? +this.form.get('casing.msMedium').value : 0;
        const msHeavyDepth = this.form.get('casing.msHeavy').value ? +this.form.get('casing.msHeavy').value : 0;
        const totalDrilling = this.form.get('drilling.depth').value ? +this.form.get('drilling.depth').value : 0;
        let hammerDepth = 0;
        let casingDepth = 0;

        if (msMediumDepth || msHeavyDepth) {
            casingDepth = msMediumDepth + msHeavyDepth;
        } else {
            casingDepth = pvc10InchDepth + pvc7InchDepth + pvc12InchDepth;
        }

        hammerDepth = totalDrilling - casingDepth;
        if (hammerDepth < 0) {
            hammerDepth = 0;
        }
        this.form.get('hammer').setValue(hammerDepth.toString());
    }
}