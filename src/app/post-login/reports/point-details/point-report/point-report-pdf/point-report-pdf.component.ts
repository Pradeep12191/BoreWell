import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/services/config.service';
import { HttpClient } from '@angular/common/http';
import { Point } from 'src/app/models/Point';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    templateUrl: './point-report-pdf.component.html',
    styleUrls: ['./point-report-pdf.component.scss']
})
export class PointReportPdfComponent {
    points = [];
    vehicleNo;
    params;
    constructor(
        private route: ActivatedRoute,
        private config: ConfigService,
        private http: HttpClient,
        private auth: AuthService
    ) {
        const apiUrl = this.config.getConfig('apiUrl');
        const pointUrl = this.config.getUrl('rpmReportSheet');
        const url = apiUrl + pointUrl;
        this.route.queryParams.pipe(
            switchMap((params) => {
                this.params = params;
                this.vehicleNo = params.reg_number;
                const authToken = params.auth_token || this.auth.token;
                return this.http.get<Point[]>(url, { params, headers: { Authorization: authToken } });
            })
        ).subscribe((points) => {
            this.points = points;
            this.points.forEach(point => this.generateCasingDetails(point));
        });
    }

    generateCasingDetails(point) {
        const pvc7Detail = {};
        const pvc10Detail = {};
        const pvc12Detail = {};
        const msHeavyDetail = {};
        const msMediumDetail = {};
        point['casingDetails'] = [];
        if (point.pvc7Depth || point.pvc7DepthRate || point.pvc7Amt) {
            pvc7Detail['name'] = "7\' Inch";
            pvc7Detail['depth'] = point.pvc7Depth;
            pvc7Detail['depthRate'] = point.pvc7DepthRate;
            pvc7Detail['totalAmount'] = point.pvc7Amt;
            point.casingDetails.push(pvc7Detail)
        }
        if (point.pvc10Depth || point.pvc10DepthRate || point.pvc10Amt) {
            pvc10Detail['name'] = "PVC 10\' Inch"
            pvc10Detail['depth'] = point.pvc10Depth;
            pvc10Detail['depthRate'] = point.pvc10DepthRate;
            pvc10Detail['totalAmount'] = point.pvc10Amt;
            point.casingDetails.push(pvc10Detail)
        }
        if (point.pvc12Depth || point.pvc12DepthRate || point.pvc12Amt) {
            pvc12Detail['name'] = "PVC 12\' Inch"
            pvc12Detail['depth'] = point.pvc12Depth;
            pvc12Detail['depthRate'] = point.pvc12DepthRate;
            pvc12Detail['totalAmount'] = point.pvc12Amt;
            point.casingDetails.push(pvc12Detail);
        }
        if (point.msMediumDepth || point.msMediumDepthRate || point.msMediumAmt) {
            msMediumDetail['name'] = "MS Medium"
            msMediumDetail['depth'] = point.msMediumDepth;
            msMediumDetail['depthRate'] = point.msMediumDepthRate;
            msMediumDetail['totalAmount'] = point.msMediumAmt;
            point.casingDetails.push(msMediumDetail);
        }
        if (point.msHeavyDepth || point.msHeavyDepthRate || point.msHeavyAmt) {
            msHeavyDetail['name'] = "MS Heavy"
            msHeavyDetail['depth'] = point.msHeavyDepth;
            msHeavyDetail['depthRate'] = point.msHeavyDepthRate;
            msHeavyDetail['totalAmount'] = point.msHeavyAmt;
            point.casingDetails.push(msHeavyDetail);
        }
    }
}
