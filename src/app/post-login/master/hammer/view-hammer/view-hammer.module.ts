import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { SharedModule } from '../../../../shared.module';
import { ExpandTableModule } from '../../../../expand-table/expand-table.module';
import { ViewHammerComponent } from './view-hammer.component';
import { ViewHammerRoutingModule } from './view-hammer-routing.module';
import { HammerListResolver } from '../../../../guards/resolveGuard/hammer/hammer-list.resolver';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        SharedModule,
        ViewHammerRoutingModule,
        ExpandTableModule
    ],
    declarations: [
        ViewHammerComponent
    ],
    providers: [
        HammerListResolver
    ]
})
export class ViewHammerModule {

}