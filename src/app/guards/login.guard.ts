import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router,
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean> | Promise<boolean> | boolean {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['postlogin', 'dashboard']);
            return false;
        }
        return true;
    }
}