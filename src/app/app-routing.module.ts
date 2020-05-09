import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { CustomPreloadingStrategy } from './services/pre-load.service';
import {  PointReportPdfComponent } from './post-login/reports/point-details/point-report/point-report-pdf/point-report-pdf.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    {
        path: 'postlogin',
        data: { preload: true },
        loadChildren: () => import('./post-login/post-login.module').then(mod => mod.PostLoginModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'report-pdf',
        component: PointReportPdfComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: CustomPreloadingStrategy })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
