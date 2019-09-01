import { Component, Input } from '@angular/core';
import { ConfigService } from '../../../../../services/config.service';
import { FormGroup, FormArray } from '@angular/forms';
import { RpmEntryService } from '../../rpm-entry.service';


@Component({
    selector: 'bit-details-rpm-entry',
    templateUrl: './bit-details-rpm-entry.component.html',
    styleUrls: ['./bit-details-rpm-entry.component.scss']
})
export class BitDetailsRpmEntryComponent {

    public appearance;
    @Input() form: FormGroup;

    get bitFormArray() {
        return this.form.get('bits') as FormArray;
    }

    constructor(
        private config: ConfigService,
        private res: RpmEntryService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }

    addBit() {
        this.bitFormArray.push(this.res.buildBitForm());
    }

    removeLastItem() {
        const lastIndex = this.bitFormArray.length - 1;
        if (lastIndex > 0) {
            this.bitFormArray.removeAt(lastIndex);
        }
    }
}