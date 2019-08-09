import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../../../services/config.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'point-info',
    templateUrl: './point-info.component.html',
    styleUrls: ['./point-info.component.scss']
})
export class PointInfoComponent implements OnInit {
    appearance;
    @Input() form: FormGroup;
    rigs = [
        { value: '1', display: 'KA01MP7396' },
        { value: '2', display: 'KA01MP7396' }
    ];
    boreTypes = [
        { value: '1', display: 'New Bore' },
        { value: '2', display: 'Re-Bore' },
        { value: '3', display: 'Flushing' },
    ];
    partyStates = [
        { value: '1', display: 'TamilNadu' },
        { value: '2', display: 'Karnataka' },
        { value: '3', display: 'Kerala' },
    ];
    partyCities = [
        { value: '1', display: 'Chennai' },
        { value: '2', display: 'Coimbatore' },
        { value: '3', display: 'Madurai' },
    ];
    casingTypes = [
        { value: '1', display: 'PVC' },
        { value: '2', display: 'MS (Mild Steel)' },
        { value: '3', display: 'Nill' },
    ];
    pipes = [
        { value: '1', display: 'Agent Pipe' },
        { value: '2', display: 'Party Pipe' },
        { value: '3', display: 'Company Pipe' },
        { value: '4', display: 'Nill' },
    ]
    constructor(
        private config: ConfigService
    ) {

        this.appearance = this.config.getConfig('formAppearance');
    }

    ngOnInit() {
        console.log(this.form);
    }
}