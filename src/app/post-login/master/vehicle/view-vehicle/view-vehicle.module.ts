import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { SharedModule } from '../../../../shared.module';
import { VehicleListResolver } from '../../../../guards/resolveGuard/vehicle/vehicle-list.resolver';
import { ViewVehicleComponent } from './view-vehicle.component';
import { ViewVehicleRoutingModule } from './view-vehicle-routing.module';
import { ExpandTableModule } from '../../../../expand-table/expand-table.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        SharedModule,
        ViewVehicleRoutingModule,
        ExpandTableModule
    ],
    declarations: [
        ViewVehicleComponent
    ],
    providers: [
        VehicleListResolver
    ]
})
export class ViewVehicleModule {

}