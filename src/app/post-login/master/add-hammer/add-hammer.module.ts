import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared.module';
import { AddHammerComponent } from './add-hammer.component';
import { AddHammerRoutingModule } from './add-hammer-routing.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        SharedModule,
        AddHammerRoutingModule
    ],
    declarations: [
        AddHammerComponent
    ]
})
export class AddHammerModule{

}