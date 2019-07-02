import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { PointEntryService } from '../point-entry.serice';

@Component({
    selector: 'hammer-details',
    templateUrl: './hammer-details.component.html',
    styleUrls: ['./hammer-details.component.scss']
})
export class HammerDetailsComponent implements OnInit {
    @Input('form') hammerDetailsForm: FormGroup;
    hammers;

    get hammerFormArray(){
        return this.hammerDetailsForm.get('hammers') as FormArray
    }

    constructor(
        private pes: PointEntryService
    ){

    }

    ngOnInit() {
        this.hammers = [
            { value: '1', display: '' }
        ]
    }

    addMoreHammer(){
        this.hammerFormArray.push(this.pes.hammerFormBuilder())
    }

    removeHammer(index){
        this.hammerFormArray.removeAt(index);
    }
}