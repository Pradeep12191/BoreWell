import { NgControl } from '@angular/forms';

export interface FocusableControl {
    focus(): void;
    ngControl: NgControl
}