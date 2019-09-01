import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../../../services/config.service';
import { FormGroup } from '@angular/forms';
import { RpmEntryService } from '../rpm-entry.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'other-details-rpm-entry',
    templateUrl: './other-details-rpm-entry.component.html',
    styleUrls: ['./other-details-rpm-entry.component.scss']
})
export class OtherDetailsRpmEntryComponent implements OnInit, OnDestroy {
    public appearance;
    @Input() form: FormGroup;
    boreTypeChangeSubcription: Subscription;
    selectedBore = 'newBore'

    constructor(
        private config: ConfigService,
        private res: RpmEntryService
    ) {
        this.appearance = this.config.getConfig('formAppearance')
    }

    ngOnInit() {
        this.boreTypeChangeSubcription = this.res.boreChangeObs().subscribe((boreType) => {
            this.selectedBore = boreType;
        });
    }

    ngOnDestroy() {
        if (this.boreTypeChangeSubcription) { this.boreTypeChangeSubcription.unsubscribe(); }
    }

    calcTotalAmout() {
        let perLiterAmt = this.form.get('diesel.perLiterAmt').value;
        let totalLiter = this.form.get('diesel.totalLiter').value;
        let totalAmt = 0;

        perLiterAmt = perLiterAmt ? +perLiterAmt : 0;
        totalLiter = totalLiter ? +totalLiter : 0;
        totalAmt = perLiterAmt * totalLiter;

        if (totalAmt > 0) {
            totalAmt = Math.round(totalAmt * 100) / 100;
        }

        this.form.get('diesel.totalAmt').setValue(totalAmt.toString());
    }
}