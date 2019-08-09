import { Component, Input } from '@angular/core';
import { ConfigService } from '../../../../services/config.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'point',
    templateUrl: './point.component.html',
    styleUrls: ['./point.component.scss']
})
export class PointComponent{
    appearance;
    @Input() form: FormGroup;
    constructor(
        private config: ConfigService
    ){
        this.appearance = this.config.getConfig('formAppearance');
    }
}