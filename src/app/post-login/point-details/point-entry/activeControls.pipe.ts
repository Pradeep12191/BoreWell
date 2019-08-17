import { PipeTransform, Pipe } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
    name: 'activeControls'
})
export class activeControlsPipe implements PipeTransform {
    transform(controls: FormGroup[]) { 
        return controls.filter(ctrl => {
            // console.log(ctrl)
            return !ctrl.get('isDeleted').value
        })
    }
}