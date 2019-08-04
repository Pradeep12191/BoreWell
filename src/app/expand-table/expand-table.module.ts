import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule, MatTableModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ExpandTableComponent } from './expand-table.component';
import { ExpandDetailsDirective } from './expand-deatils.directive';

@NgModule({
    imports: [
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        CommonModule
    ],
    declarations: [
        ExpandTableComponent,
        ExpandDetailsDirective
    ],
    exports: [
        ExpandTableComponent,
        ExpandDetailsDirective
    ]
})
export class ExpandTableModule {

}