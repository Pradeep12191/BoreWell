import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostLoginComponent } from './post-login.component';
import { PointEntryComponent } from './point-details/point-entry/point-entry.component';
import { S404Component } from '../404/404.component';

const routes: Routes = [
    {
        path: '', component: PostLoginComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'pointDetails', loadChildren: () => import('./point-details/point-entry/point-entry.module').then(mod => mod.PointEntryModule) },
            { path: 'master/vehicle/addVehicle', loadChildren: () => import('./master/add-vehicle/add-vehicle.module').then(mod => mod.AddVehicleModule) },
            { path: 'master/hammer/addHammer', loadChildren: () => import('./master/add-hammer/add-hammer.module').then(mod => mod.AddHammerModule) },
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