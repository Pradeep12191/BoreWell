import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointEntryComponent } from './point-entry.component';
import { MaterialModule } from '../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { PointEntryRoutingMOdule } from './point-entry-routing.module';
import { PointEntryDetailsComponent } from './point-entry-details/point-entry-details.component';
import { OtherChargesComponent } from './other-charges/other-charges.component';
import { PointEntryService } from './point-entry.serice';
import { BitDetailsComponent } from './bit-details/bit-details.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        PointEntryRoutingMOdule
    ],
    declarations: [
        PointEntryComponent,
        PointEntryDetailsComponent,
        OtherChargesComponent,
        BitDetailsComponent
    ],
    providers: [PointEntryService]
})
export class PointEntryModule {

}