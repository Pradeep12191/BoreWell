import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared.module';
import { AddHammerComponent } from './add-hammer.component';
import { AddHammerRoutingModule } from './add-hammer-routing.module';
import { MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { DialogModule } from '../dialog/dialog.module';
import { HammerDistributorListResolver } from '../../../guards/resolveGuard/hammer/hammer-distributor-list.resolver';
import { HammerCompanyListResolver } from '../../../guards/resolveGuard/hammer/hammer-company-list.resolver';

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
        AddHammerRoutingModule,
        DialogModule
    ],
    declarations: [
        AddHammerComponent
    ],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: matDialogConfig },
        HammerDistributorListResolver,
        HammerCompanyListResolver
    ]
})
export class AddHammerModule {

}