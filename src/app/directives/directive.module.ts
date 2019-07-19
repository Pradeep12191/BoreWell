import { NgModule } from '@angular/core';
import { PositiveNumberDirective } from './onlyPositiveNumber.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [PositiveNumberDirective],
    exports: [PositiveNumberDirective]
})
export class DirectiveModule {

}