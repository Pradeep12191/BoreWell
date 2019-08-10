import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointReportComponent } from './point-report.component';
import { PointReportReolver } from '../../../../guards/resolveGuard/reports/point-report/point-report.resolver';

const routes: Routes = [
    {
        path: '', component: PointReportComponent, resolve: {
            points: PointReportReolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PointReportRoutingModule {

}