import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointEntryComponent } from './point-entry.component';
import { MaterialModule } from '../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { PointEntryRoutingMOdule } from './point-entry-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        PointEntryRoutingMOdule
    ],
    declarations: [
        PointEntryComponent
    ]
})
export class PointEntryModule {

}