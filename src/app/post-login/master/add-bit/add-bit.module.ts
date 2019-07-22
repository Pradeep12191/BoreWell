import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared.module';
import { AddBitComponent } from './add-bit.component';
import { AddBitRoutingModule } from './add-bit-routing.module';
import { AddDistributorDialogComponent } from './dialog/add-distributor/add-distributor.dialog.component';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        SharedModule,
        AddBitRoutingModule
    ],
    declarations: [
        AddBitComponent,
        AddDistributorDialogComponent
    ],
    entryComponents: [
        AddDistributorDialogComponent
    ]
})
export class AddBitModule {

}