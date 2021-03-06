import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { SharedModule } from '../../../../shared.module';
import { ViewBitRoutingModule } from './view-bit-routing.module';
import { ViewBitComponent } from './view-bit.component';
import { BitListResolver } from '../../../../guards/resolveGuard/bit/bit-list.resolver';
import { ExpandTableModule } from '../../../../expand-table/expand-table.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        SharedModule,
        ViewBitRoutingModule,
        ExpandTableModule
    ],
    declarations: [
        ViewBitComponent
    ],
    providers: [
        BitListResolver
    ]
})
export class ViewBitModule {

}