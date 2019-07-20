import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { CustomPreloadingStrategy } from './services/pre-load.service';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    {
        path: 'postlogin',
        data: { preload: true },
        loadChildren: () => import('./post-login/post-login.module').then(mod => mod.PostLoginModule),
        canActivate: [AuthGuard]
    },
    // {
    //     path: 'dashboard',

    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: CustomPreloadingStrategy })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
