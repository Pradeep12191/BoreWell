import { Component } from '@angular/core';
import { ConfigService } from '../../../../services/config.service';


@Component({
    selector: 'other-details-rpm-entry',
    templateUrl: './other-details-rpm-entry.component.html',
    styleUrls: ['./other-details-rpm-entry.component.scss']
})
export class OtherDetailsRpmEntryComponent {
    public appearance;

    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance')
    }
}