import { Component } from '@angular/core';
import { ConfigService } from '../../../../../services/config.service';


@Component({
    selector: 'bit-details-rpm-entry',
    templateUrl: './bit-details-rpm-entry.component.html',
    styleUrls: ['./bit-details-rpm-entry.component.scss']
})
export class BitDetailsRpmEntryComponent {

    public appearance;

    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }
}