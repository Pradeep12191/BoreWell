import { Component, Input } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../services/config.service';

@Component({
    selector: 'point-other-details',
    templateUrl: './point-other-details.component.html',
    styleUrls: ['./point-other-details.component.scss']
})
export class PointOtherDetailsComponent {
    appearance;
    @Input() form: FormGroup;
    constructor(
        private config: ConfigService
    ){
        this.appearance = this.config.getConfig('formAppearance');
    }
}