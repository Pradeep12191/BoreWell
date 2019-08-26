import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

export class HammerListResolver implements Resolve<any>{
    constructor(
        private config: ConfigService,
        private http: HttpClient,
        private authService: AuthService
    ) {
        const baseUrl = this.config.getConfig('apiUrl');
        const url = this.config.getUrl('viewhammerlist');
        this.hammersUrl = baseUrl + url; 
    }

    hammersUrl;

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.http.get(this.hammersUrl + '/' + this.authService.userid)
    }
}