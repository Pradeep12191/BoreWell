import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../services/config.service';

@Component({
    selector: 'point-other-details',
    templateUrl: './point-other-details.component.html',
    styleUrls: ['./point-other-details.component.scss']
})
export class PointOtherDetailsComponent implements OnInit {
    appearance;
    @Input() form: FormGroup;
    totalRpm;
    constructor(
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }

    ngOnInit() {
        this.totalRpm = this.form.parent.get('point.bitDetails.totalRpm').value;
    }
}