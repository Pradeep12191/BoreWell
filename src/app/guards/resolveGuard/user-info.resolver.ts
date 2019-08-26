import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserInfoResolver implements Resolve<any>{
    constructor(
        private config: ConfigService,
        private http: HttpClient,
        private auth: AuthService
    ) {
        const baseUrl = this.config.getConfig('apiUrl');
        const url = this.config.getUrl('userInfo');
        this.userInfoUrl = baseUrl + url;
    }

    userInfoUrl;

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.http.get(this.userInfoUrl + '/' + this.auth.username).pipe(tap((response) => {
            if (response) {
                if (!this.auth.userid) {
                    this.auth.userid = response.user_id;
                }   
            }
        }));
    }
}