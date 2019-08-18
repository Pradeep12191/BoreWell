import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { PointEntryComponent } from './point-details/point-entry/point-entry.component';
import { PointEntryModule } from './point-details/point-entry/point-entry.module';
import { PostLoginRoutingModule } from './post-login-routing.module';
import { PostLoginComponent } from './post-login.component';
import { SharedModule } from '../shared.module';
import { HeaderComponent } from '../header/header.component';
import { S404Component } from '../404/404.component';
import { MobileSidenavComponent } from './mobile-sidenav/mobile-sidenav.component';
import { StateResolver } from '../guards/resolveGuard/state.resolver';
import { UserInfoResolver } from '../guards/resolveGuard/user-info.resolver';
import { VehicleTypeResolver } from '../guards/resolveGuard/vehicle/vehicle-type.resolver';
import { BoreSizeResolver } from '../guards/resolveGuard/vehicle/bore-size.resolver';
import { ContactTypeResolver } from '../guards/resolveGuard/select-option/contact-type.resolver.';
import { AgentTypeResolver } from '../guards/resolveGuard/select-option/agent-type.resolver';
import { DrillingCommissionTypeResolver } from '../guards/resolveGuard/select-option/drilling-commission-type.resolver';
import { CasingCommissionTypeResolver } from '../guards/resolveGuard/select-option/casing-commission-type.resolver';
import { CasingPaymentTypeResolver } from '../guards/resolveGuard/select-option/casing-payment-type.resolver';
import { BoreTypeResolver } from '../guards/resolveGuard/select-option/bore-type.resolver';
import { CasingTypeResolver } from '../guards/resolveGuard/select-option/casing-type.resolver';
import { PipeTypeResolver } from '../guards/resolveGuard/select-option/pipe-type.resolver';
import { VehiclesResolver } from '../guards/resolveGuard/vehicles.resolver';
import { PVCTypeResolver } from '../guards/resolveGuard/select-option/pvc-type.resolver';
import { NullFilterPipe } from '../pipes/nullFilter.pipe';



@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        PostLoginRoutingModule,
        SharedModule,
    ],
    declarations: [
        DashboardComponent,
        PostLoginComponent,
        HeaderComponent,
        S404Component,
        MobileSidenavComponent,
    ],
    providers: [
        StateResolver,
        UserInfoResolver,
        VehicleTypeResolver,
        VehiclesResolver,
        BoreSizeResolver,
        ContactTypeResolver,
        AgentTypeResolver,
        DrillingCommissionTypeResolver,
        CasingCommissionTypeResolver,
        CasingPaymentTypeResolver,
        BoreTypeResolver,
        CasingTypeResolver,
        PipeTypeResolver,
        PVCTypeResolver
    ],
})
export class PostLoginModule {

}