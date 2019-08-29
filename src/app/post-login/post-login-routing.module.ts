import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostLoginComponent } from './post-login.component';
import { PointEntryComponent } from './point-details/point-entry/point-entry.component';
import { S404Component } from '../404/404.component';
import { HeaderComponent } from '../header/header.component';
import { UserInfoResolver } from '../guards/resolveGuard/user-info.resolver';

const routes: Routes = [
    {
        path: '', component: PostLoginComponent, children: [
            {
                path: '', component: HeaderComponent, outlet: 'header',
                resolve: {
                    userInfo: UserInfoResolver
                }
            },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'pointDetails', loadChildren: () => import('./point-details/point-entry/point-entry.module').then(mod => mod.PointEntryModule) },
            { path: 'rpmDetails', loadChildren: () => import('./point-details/rpm-entry/rpm-entry.module').then(mod => mod.RpmEntryModule) },
            { path: 'master/vehicle/addVehicle', loadChildren: () => import('./master/add-vehicle/add-vehicle.module').then(mod => mod.AddVehicleModule) },
            { path: 'master/vehicle/viewVehicle', loadChildren: () => import('./master/vehicle/view-vehicle/view-vehicle.module').then(mod => mod.ViewVehicleModule) },
            { path: 'master/hammer/addHammer', loadChildren: () => import('./master/add-hammer/add-hammer.module').then(mod => mod.AddHammerModule) },
            { path: 'master/hammer/viewHammer', loadChildren: () => import('./master/hammer/view-hammer/view-hammer.module').then(mod => mod.ViewHammerModule) },
            { path: 'master/bit/addBit', loadChildren: () => import('./master/add-bit/add-bit.module').then(mod => mod.AddBitModule) },
            { path: 'master/bit/viewBit', loadChildren: () => import('./master/bit/view-bit/view-bit.module').then(mod => mod.ViewBitModule) },
            { path: 'master/agent/addAgent', loadChildren: () => import('./master/add-agent/add-agent.module').then(mod => mod.AddAgentModule) },
            { path: 'master/agent/viewAgent', loadChildren: () => import('./master/agent/view-agent/view-agent.module').then(mod => mod.ViewAgentModule) },
            { path: 'reports/pointDetails/pointReport', loadChildren: () => import('./reports/point-details/point-report/point-report.module').then(mod => mod.PointReportModule) },
            { path: 'reports/pointDetails/pointReport/:pointno', loadChildren: () => import('./reports/point-details/point-report/point-report.module').then(mod => mod.PointReportModule) },
            { path: '**', component: S404Component }
        ]
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostLoginRoutingModule {

}