import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDistributorDialogComponent } from './add-distributor/add-distributor.dialog.component';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        FlexLayoutModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        AddDistributorDialogComponent
    ],
    entryComponents: [AddDistributorDialogComponent]
})
export class DialogModule{

}