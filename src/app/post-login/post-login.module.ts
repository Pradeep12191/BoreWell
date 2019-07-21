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
        MobileSidenavComponent
    ],
    providers: [
        StateResolver,
        UserInfoResolver 
    ]
})
export class PostLoginModule{

}