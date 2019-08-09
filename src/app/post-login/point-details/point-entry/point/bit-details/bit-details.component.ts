import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { PointEntryService } from '../../point-entry.serice';
import { ConfigService } from '../../../../../services/config.service';


@Component({
    selector: 'bit-details',
    templateUrl: './bit-details.component.html',
    styleUrls: ['./bit-details.component.scss']
})
export class BitDetailsComponent implements OnInit{
    @Input('form') bitDetailsForm;
    bits;
    appearance: string

    constructor(
        private pes: PointEntryService,
        private config: ConfigService
    ){
        this.appearance = this.config.getConfig('formAppearance');
    }

    get bitFormArray(){
        return this.bitDetailsForm.get('bits') as FormArray
    }

    ngOnInit(){
        this.bits = [
            {value: '1', display: 'BOMI'}
        ]
    }

    removeBit(index){
        this.bitFormArray.removeAt(index);
    }

    addMoreBit(){
        this.bitFormArray.push(this.pes.bitFormBuilder())
    }

}