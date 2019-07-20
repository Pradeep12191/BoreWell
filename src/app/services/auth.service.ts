import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    _username: string = 'santhosh';
    _password: string = '12345';

    get username() {
        return this._username
    }

    get password() {
        return this._password;
    }
}