import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule, MatTableModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ExpandTableComponent } from './expand-table.component';
import { ExpandDetailsDirective } from './expand-deatils.directive';
import { SharedModule } from '../shared.module';

@NgModule({
    imports: [
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        CommonModule,
        SharedModule
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