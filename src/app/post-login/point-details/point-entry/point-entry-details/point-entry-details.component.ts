import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'point-entry-details',
    templateUrl: './point-entry-details.component.html',
    styleUrls: ['./point-entry-details.component.scss']
})
export class PointEntryDetailsComponent {
    @Input('form') pointEntryForm: FormGroup

    get feetsFormArray(){
        return this.pointEntryForm.get('feets') as FormArray
    }

    constructor(
        private fb: FormBuilder
    ){

    }

    public addMoreFeet(){
        this.feetsFormArray.push(this.feetFormBuilder())
    }

    public removeLastFeet(){
        this.feetsFormArray.removeAt(this.feetsFormArray.length - 1)
    }

    private feetFormBuilder() {
        return this.fb.group({
          startFeet: [0, Validators.required],
          endFeet: [null, Validators.required],
          amtPerFeet: [null, Validators.required],
          amt: [null, Validators.required]
        })
      }
}