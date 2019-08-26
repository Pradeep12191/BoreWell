import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { Bit } from '../../../post-login/master/bit/Bit';

export class BitListResolver implements Resolve<any>{
    constructor(
        private config: ConfigService,
        private http: HttpClient,
        private authService: AuthService
    ) {
        const baseUrl = this.config.getConfig('apiUrl');
        const url = this.config.getUrl('view_bit');
        this.bitsUrl = baseUrl + url; 
    }

    bitsUrl;

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.http.get<Bit[]>(this.bitsUrl + '/' + this.authService.userid)
    }
}