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
        // const decodeStr = this.auth.username + ':' + this.auth.password;
        // const encodeStr = btoa(decodeStr);
        // dont want to append auth header for rpm_sheet_report, as handled directly in calling component for report
        if (req.url.includes('rpm_sheet_report')) {
            return next.handle(req);
        }
        let modifiedRequest = req.clone();
        if (req.method === 'POST' || req.method === 'PUT') {
            modifiedRequest = req.clone({
                body: { user: this.auth.username, user_id: +this.auth.userid, ...req.body },
                headers: req.headers.append('Authorization', this.auth.token ? this.auth.token : '')
            })
        } else if (req.method === 'GET') {
            modifiedRequest = req.clone({
                headers: req.headers.append('Authorization', this.auth.token ? this.auth.token : '')
            })
        }

        return next.handle(modifiedRequest);
    }
}