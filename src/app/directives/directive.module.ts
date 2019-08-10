import { NgModule } from '@angular/core';
import { PositiveNumberDirective } from './onlyPositiveNumber.directive';
import { CommonModule } from '@angular/common';
import { ScrollToInvalidDirective } from './scroll-to-invalid.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        PositiveNumberDirective,
        ScrollToInvalidDirective
    ],
    exports: [
        PositiveNumberDirective,
        ScrollToInvalidDirective
    ]
})
export class DirectiveModule {

}