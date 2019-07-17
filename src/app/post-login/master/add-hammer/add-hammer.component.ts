import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: './add-hammer.component.html',
    styleUrls: ['./add-hammer.component.scss']
})
export class AddHammerComponent implements OnInit {
    appearance;
    addHammerForm: FormGroup;
    companies = [
        { value: '1', display: 'RGR HAMMER' }
    ];
    distributors = [
        { value: '1', display: 'RAJ REDDY' }
    ];
    rigs = [
        { value: '1', display: 'KA01MP7396' }
    ];
    constructor(
        private configService: ConfigService,
        private fb: FormBuilder
    ) {
        this.appearance = this.configService.getConfig('formAppearance');
    }

    ngOnInit() {
        this.addHammerForm = this.fb.group({
            purchaseDate: [null, Validators.required],
            name: [null, Validators.required],
            companyName: null,
            distributorDetails: null,
            rig: [null, Validators.required],
            number: [null, Validators.required],
            barrelScale: [null, Validators.required],
            spechSetSize: null,
            pistonNumber: [null, Validators.required],
            controlTubeNumber: [null, Validators.required]
        })
    }

    saveHammer() {
        console.log( JSON.stringify(this.addHammerForm.value, null, 2))
    }
}