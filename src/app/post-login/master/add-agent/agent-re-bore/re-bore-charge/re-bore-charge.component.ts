import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';

@Component({
    selector: 're-bore-charge',
    templateUrl: './re-bore-charge.component.html',
    styleUrls: ['./re-bore-charge.component.scss']
})
export class ReBoreChargeComponent {
    @Input() form: FormGroup;
    appearance;
    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }
}