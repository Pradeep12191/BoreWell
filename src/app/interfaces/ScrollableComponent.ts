import { ElementRef, QueryList } from '@angular/core';
import { FocusableControl } from './FocusableControl';

export interface ScrollableComponent {
    el: ElementRef,
    requiredControls: QueryList<FocusableControl>
}