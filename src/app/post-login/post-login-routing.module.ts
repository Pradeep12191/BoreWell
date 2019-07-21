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
                path: '', component: HeaderComponent, outlet: 'header', resolve: {
                    userInfo: UserInfoResolver
                }
            },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'pointDetails', loadChildren: () => import('./point-details/point-entry/point-entry.module').then(mod => mod.PointEntryModule) },
            { path: 'master/vehicle/addVehicle', loadChildren: () => import('./master/add-vehicle/add-vehicle.module').then(mod => mod.AddVehicleModule) },
            { path: 'master/hammer/addHammer', loadChildren: () => import('./master/add-hammer/add-hammer.module').then(mod => mod.AddHammerModule) },
            { path: 'master/bit/addBit', loadChildren: () => import('./master/add-bit/add-bit.module').then(mod => mod.AddBitModule) },
            { path: 'master/agent/addAgent', loadChildren: () => import('./master/add-agent/add-agent.module').then(mod => mod.AddAgentModule) },
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