import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PVCTypeResolver implements Resolve<any>{
    constructor(
        private config: ConfigService,
        private http: HttpClient
    ) {
        this.pvcTypeUrl = this.config.getAbsoluteUrl('getpvctype');
    }

    pvcTypeUrl;

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.http.get(this.pvcTypeUrl)
    }
}