import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', redirectTo: '/postlogin/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'postlogin', loadChildren: () => import('./post-login/post-login.module').then(mod => mod.PostLoginModule) },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
