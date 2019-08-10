import { Directive, Input, HostListener } from '@angular/core';
import { ScrollableComponent } from '../interfaces/ScrollableComponent';
import { MatStepper } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Directive({
    selector: '[scrollToInvalid]'
})
export class ScrollToInvalidDirective {
    @Input('scrollToInvalid') comp: ScrollableComponent
    @Input() stepper: MatStepper;
    @Input() form: FormGroup
    @HostListener('click') onClick() {
        this.stepper.next();
        if (!this.comp.requiredControls) {
            return console.warn('Property requiredControls is missing: scroll to invalid directive expects element reference')
        }
        if (this.form.invalid) {
            // scroll to invalid control
            this.comp.requiredControls.toArray().every((ctrl) => {
                if (ctrl.ngControl.invalid) {
                    ctrl.focus();
                    return false;
                }
                return true;
            })
            // const firstInvalidControl = (this.comp.el.nativeElement as HTMLElement).querySelector('mat-form-field.ng-invalid');
            // const inputControl = firstInvalidControl.querySelector('input');
            // if (firstInvalidControl.contains(inputControl)) {
            //     inputControl.focus()
            // } else {
            //     firstInvalidControl.scrollIntoView({ behavior: 'smooth' });
            // }
        }

    }
}