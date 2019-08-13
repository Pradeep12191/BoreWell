import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { PointEntryService } from '../../point-entry.service';
import { ConfigService } from '../../../../../services/config.service';


@Component({
    selector: 'other-charges',
    templateUrl: './other-charges.component.html',
    styleUrls: ['./other-charges.component.scss']
})
export class OtherChargesComponent implements OnInit{
    @Input('form') otherChargesForm: FormGroup;
    charges;
    appearance;

    constructor(
        private pes: PointEntryService,
        private config: ConfigService
    ){
        this.appearance = this.config.getConfig('formAppearance');
    }

    get chargesFormArray(){
        return this.otherChargesForm.get('charges') as FormArray
    }



    ngOnInit(){
        this.charges = [
            {value: '1', display: 'SENSOR'}
        ]
    }

    public addMoreCharge(){
        this.chargesFormArray.push(this.pes.chargeFormBuilder())
    }

    public removeCharge(index){
        this.chargesFormArray.removeAt(index);
    }
}