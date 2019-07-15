import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared.module';
import { AddVehicleComponent } from './add-vehicle.component';
import { AddVehicleRoutingModule } from './add-vehicle-routing.module';
import { AddVehicleService } from './add-vehicle.service';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleContactDetailsComponent } from './vehicle-details/vehicle-contact-details/vehicle-contact-details.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        AddVehicleRoutingModule,
        SharedModule
    ],
    declarations: [
        AddVehicleComponent,
        VehicleInfoComponent,
        VehicleDetailsComponent,
        VehicleContactDetailsComponent
    ],
    providers: [
        AddVehicleService
    ]
})
export class AddVehicleModule {

}