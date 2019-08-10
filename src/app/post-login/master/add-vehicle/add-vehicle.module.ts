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
import { VehicleInsuranceDetailsComponent } from './vehicle-details/vehicle-insurance-details/vehicle-insurance-details.component';
import { VehicleLabourInsuranceDetailsComponent } from './vehicle-details/vehicle-labour-insurance-details/vehicle-labour-insurance-details.component';
import { VehiclePermitDetailsComponent } from './vehicle-details/vehicle-permit-details/vehicle-permit-details.component';
import { VehicleCertificatesComponent } from './vehicle-certificates/vehicle-certificates.component';
import { VehiclePollutionCertificatesComponent } from './vehicle-certificates/vehicle-pollution-certificate/vehicle-pollution-certificate.component';
import { VehicleRoadTaxComponent } from './vehicle-certificates/vehicle-road-tax/vehicle-road-tax.component';
import { VehicleFitnessCertificatesComponent } from './vehicle-certificates/vehicle-fitness-certificate/vehicle-fitness-certificate.component';
import { DirectiveModule } from '../../../directives/directive.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        AddVehicleRoutingModule,
        SharedModule,
        DirectiveModule
    ],
    declarations: [
        AddVehicleComponent,
        VehicleInfoComponent,
        VehicleDetailsComponent,
        VehicleContactDetailsComponent,
        VehicleInsuranceDetailsComponent,
        VehicleLabourInsuranceDetailsComponent,
        VehiclePermitDetailsComponent,
        VehicleCertificatesComponent,
        VehiclePollutionCertificatesComponent,
        VehicleRoadTaxComponent,
        VehicleFitnessCertificatesComponent
    ],
    providers: [
        AddVehicleService
    ]
})
export class AddVehicleModule {

}