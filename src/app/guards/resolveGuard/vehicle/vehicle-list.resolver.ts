import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { Bit } from '../../../post-login/master/bit/Bit';

export class VehicleListResolver implements Resolve<any>{
    constructor(
        private config: ConfigService,
        private http: HttpClient,
        private authService: AuthService
    ) {
        const baseUrl = this.config.getConfig('apiUrl');
        const url = this.config.getUrl('view_vehicle_list');
        this.vehiclesUrl = baseUrl + url; 
    }

    vehiclesUrl;

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.http.get<Bit[]>(this.vehiclesUrl + '/' + this.authService.userid)
    }
}