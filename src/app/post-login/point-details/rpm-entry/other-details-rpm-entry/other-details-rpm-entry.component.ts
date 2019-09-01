import { Component, Input } from '@angular/core';
import { ConfigService } from '../../../../services/config.service';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'other-details-rpm-entry',
    templateUrl: './other-details-rpm-entry.component.html',
    styleUrls: ['./other-details-rpm-entry.component.scss']
})
export class OtherDetailsRpmEntryComponent {
    public appearance;
    @Input() form: FormGroup;

    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance')
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