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
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.pointUrl = '';
        const todayDate = moment().format('DD-MM-YYYY');
        const apiUrl = this.config.getConfig('apiUrl');
        const pointUrl = this.config.getUrl('viewpointlist');
        this.pointUrl = apiUrl + pointUrl + '/' + this.auth.username;

        if (route.params) {
            const date = route.params.date;
            if (date) {
                this.pointUrl = this.pointUrl + '/' + date
            } else {
                this.pointUrl = this.pointUrl + '/25'
            }
        }
        return this.http.get(this.pointUrl)
    }
}