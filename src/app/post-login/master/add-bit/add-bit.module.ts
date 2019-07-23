import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared.module';
import { AddBitComponent } from './add-bit.component';
import { AddBitRoutingModule } from './add-bit-routing.module';
import { AddDistributorDialogComponent } from './dialog/add-distributor/add-distributor.dialog.component';
import { AddBitSizeDialogComponent } from './dialog/add-size/add-size.dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material';
import { DirectiveModule } from '../../../directives/directive.module';

const matDialogConfig: MatDialogConfig = {
    width: '700px',
    hasBackdrop: true,
    position: { top: '50px' }
}

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        SharedModule,
        AddBitRoutingModule,
        DirectiveModule
    ],
    declarations: [
        AddBitComponent,
        AddDistributorDialogComponent,
        AddBitSizeDialogComponent
    ],
    entryComponents: [
        AddDistributorDialogComponent,
        AddBitSizeDialogComponent
    ],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: matDialogConfig }
    ]
})
export class AddBitModule {

}