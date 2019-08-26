import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

export class HammerCompanyListResolver implements Resolve<any>{
    constructor(
        private config: ConfigService,
        private http: HttpClient,
        private authService: AuthService
    ) {
        const baseUrl = this.config.getConfig('apiUrl');
        const url = this.config.getUrl('gethammer_company_list');
        this.bitsUrl = baseUrl + url; 
    }

    bitsUrl;

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.http.get(this.bitsUrl + '/' + this.authService.userid)
    }
}