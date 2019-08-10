import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../../services/config.service';
import { AuthService } from '../../../../services/auth.service';
import * as moment from 'moment';

export class PointReportReolver implements Resolve<any> {

    pointUrl;

    constructor(
        private http: HttpClient,
        private config: ConfigService,
        private auth: AuthService
    ) {
        const apiUrl = this.config.getConfig('apiUrl');
        const pointUrl = this.config.getUrl('viewpointlist');
        const todayDate = moment().format('DD-MM-YYYY');
        this.pointUrl = apiUrl + pointUrl + '/' + this.auth.username + '/' + todayDate
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.http.get(this.pointUrl)
    }
}