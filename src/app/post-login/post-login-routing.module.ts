import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostLoginComponent } from './post-login.component';
import { PointEntryComponent } from './point-details/point-entry/point-entry.component';

const routes: Routes = [
    {
        path: '', component: PostLoginComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'pointDetails/pointEntry', component: PointEntryComponent }
        ]
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostLoginRoutingModule {

}