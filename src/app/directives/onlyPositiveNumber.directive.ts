import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[poistiveNumber]'
})
export class PositiveNumberDirective {

    @HostListener('keypress', ['$event']) onkeypress(e: KeyboardEvent) {
        return e.charCode >= 48 && e.charCode <= 57
    }
    @HostBinding('autocomplete') autocomplete = 'off'
    @HostBinding('pattern') pattern = '[0-9]*'
    @HostBinding('attr.inputmode') inputmode = 'numeric'
}