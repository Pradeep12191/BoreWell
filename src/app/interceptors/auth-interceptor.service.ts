import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private auth: AuthService
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const decodeStr = this.auth.username + ':' + this.auth.password;
        const encodeStr = btoa(decodeStr);
        const modifiedRequest = req.clone({
            body: { user: this.auth.username, ...req.body },
            headers: req.headers.append('Authorization', encodeStr)
        })
        return next.handle(modifiedRequest);
    }
}