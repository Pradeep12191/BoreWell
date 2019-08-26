import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import * as moment from 'moment';

@Injectable()
export class AuthService {
    private _username: string = null;
    private _userid: string = null;
    private _password: string = null;

    constructor(
        private cookie: CookieService,
        private router: Router
    ) {

    }

    get userid() {
        const useridExists = this.cookie.check('userid');
        if (useridExists) {
            return this.cookie.get('userid')
        }
        return this._userid
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

    set userid(id) {
        if (id) {
            this.cookie.set('userid', id, moment().add(50, 'day').toDate());
            this._userid = id;
        } else {
            this.cookie.delete('userid');
            this._userid = null;
        }
    }

    set username(name) {
        if (name) {
            this.cookie.set('username', name, moment().add(50, 'day').toDate());
            this._username = name;
        } else {
            this.cookie.delete('username');
            this._username = null;
        }
    }

    set password(password) {
        if (password) {
            this.cookie.set('password', password, moment().add(50, 'day').toDate());
            this._password = password;
        } else {
            this.cookie.delete('password');
            this._password = null;
        }
    }

    logOut() {
        this.userid = null;
        this.password = null;
        this.username = null;
        this.router.navigate(['login']);
    }

    isLoggedIn() {
        return this.username || this.password
    }
}