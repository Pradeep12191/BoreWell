import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class VehiclesResolver implements Resolve<any>{
    constructor(
        private config: ConfigService,
        private http: HttpClient,
        private auth: AuthService
    ) {
        const baseUrl = this.config.getConfig('apiUrl');
        const url = this.config.getUrl('vehicle_list');
        this.vehcilesUrl = baseUrl + url; 
    }

    vehcilesUrl;

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.http.get(this.vehcilesUrl + '/' + this.auth.userid)
    }
}