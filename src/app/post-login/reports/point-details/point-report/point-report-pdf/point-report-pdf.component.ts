import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/services/config.service';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './point-report-pdf.component.html',
    styleUrls: ['./point-report-pdf.component.scss']
})
export class PointReportPdfComponent {
    constructor(
        private route: ActivatedRoute,
        private config: ConfigService,
        private http: HttpClient
    ) {
        const apiUrl = this.config.getConfig('apiUrl');
        const pointUrl = this.config.getUrl('rpmReportSheet');
        const url = apiUrl + pointUrl;
        this.route.queryParams.pipe(
            switchMap((params) => {
                return this.http.get(url, { params });
            })
        ).subscribe((response) => {
            console.log(response);
        });
    }
}
