import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[poistiveNumber]'
})
export class PositiveNumberDirective {
    @Input() allowDecimal = false;
    @HostListener('keypress', ['$event']) onkeypress(e: KeyboardEvent) {
        if (this.allowDecimal) {
            return (e.charCode >= 48 && e.charCode <= 57) || (e.charCode === 13) || (e.charCode === 46)
        }
        return (e.charCode >= 48 && e.charCode <= 57) || (e.charCode === 13)
    }
    @HostBinding('autocomplete') autocomplete = 'off'
    @HostBinding('pattern') pattern = '[0-9]*'
    @HostBinding('attr.inputmode') inputmode = 'numeric'
}