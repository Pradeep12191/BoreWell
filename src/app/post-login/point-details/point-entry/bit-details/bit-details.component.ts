import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { PointEntryService } from '../point-entry.serice';


@Component({
    selector: 'bit-details',
    templateUrl: './bit-details.component.html',
    styleUrls: ['./bit-details.component.scss']
})
export class BitDetailsComponent implements OnInit{
    @Input('form') bitDetailsForm;
    bits;

    get bitFormArray(){
        return this.bitDetailsForm.get('bits') as FormArray
    }

    constructor(
        private pes: PointEntryService
    ){

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