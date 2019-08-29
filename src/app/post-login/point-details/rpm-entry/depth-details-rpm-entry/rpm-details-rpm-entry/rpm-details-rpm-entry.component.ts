import { Component } from '@angular/core';
import { ConfigService } from '../../../../../services/config.service';

@Component({
    selector: 'rpm-details-rpm-entry',
    templateUrl: './rpm-details-rpm-entry.component.html',
    styleUrls: ['./rpm-details-rpm-entry.component.scss']
})
export class RpmDetailsRpmEntryComponent {
    public appearance;
    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }
}