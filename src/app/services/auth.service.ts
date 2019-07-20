import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private _username: string = null;
    private _password: string = null;

    constructor(
        private cookie: CookieService,
        private router: Router
    ) {

    }

    get username() {
        const usernameExists = this.cookie.check('username');
        if (usernameExists) {
            return this.cookie.get('username')
        }
        return this._username
    }

    get password() {
        const passwordExists = this.cookie.check('password');
        if (passwordExists) {
            return this.cookie.get('password')
        }
        return this._password;
    }

    set username(name) {
        if (name) {
            this.cookie.set('username', name);
            this._username = name;
        } else {
            this.cookie.delete('username');
            this._username = null;
        }

    }

    set password(password) {
        if (password) {
            this.cookie.set('password', password);
            this._password = password;
        } else {
            this.cookie.delete('password');
            this._password = null;
        }
    }

    logOut() {
        this.username = null;
        this.password = null;
        this.router.navigate(['login']);
    }

    isLoggedIn() {
        return this.username || this.password
    }
}