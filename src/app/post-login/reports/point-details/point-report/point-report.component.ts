import { Component, OnDestroy } from '@angular/core';
import { Column } from '../../../../expand-table/Column';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import * as moment from 'moment';
import { ConfigService } from '../../../../services/config.service';
import { FADE_IN_ANIMATION } from '../../../../animations';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './point-report.component.html',
    styleUrls: ['./point-report.component.scss'],
    animations: [FADE_IN_ANIMATION]
})
export class PointReportComponent implements OnDestroy {
    public columns: Column[] = [
        { id: 'serialNo', name: 'COLUMN.SERIAL_NO', type: 'index', width: '15' },
        { id: 'pointno', name: 'POINT_ENTRY.COL.POINT_NO', type: 'string', width: '30' },
        { id: 'rig', name: 'POINT_ENTRY.COL.RIG', type: 'string', width: '25' },
        { id: 'edit', name: '', type: 'button', width: '10' },
        { id: 'delete', name: '', type: 'button', width: '10' },
        { id: 'more_details', name: '', type: 'toggle', width: '10', },
    ]
    public pointDataSource: MatTableDataSource<any>;
    public points;
    public dateForm: FormGroup;
    public appearance;
    public fetchingData;
    public pointUrl;
    private routeSubscritpion: Subscription;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private config: ConfigService,
        private http: HttpClient,
        private auth: AuthService,
        private toastr: ToastrService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
        this.routeSubscritpion = this.route.data.subscribe((data) => {
            if (data) {
                if (data.points) {
                    this.points = data.points;
                    this.pointDataSource = new MatTableDataSource<any>(this.points);
                }
            }
        });

        const apiUrl = this.config.getConfig('apiUrl');
        const pointUrl = this.config.getUrl('viewpointlist');
        this.pointUrl = apiUrl + pointUrl + '/' + this.auth.username;

        this.dateForm = this.fb.group({
            date: [moment()]
        })
    }

    ngOnDestroy() {
        if (this.routeSubscritpion) { this.routeSubscritpion.unsubscribe(); }
    }

    fetchData() {
        this.fetchingData = true;
        const selectedDate = (this.dateForm.get('date').value as moment.Moment).format('DD-MM-YYYY');
        this.http.get(this.pointUrl + '/' + selectedDate).subscribe((points) => {
            this.fetchingData = false;
            this.points = points;
            this.pointDataSource = new MatTableDataSource<any>(this.points);
        }, (err) => {
            if (err) {
                this.fetchingData = false;
                this.toastr.error('Error while fetching point data', null, { timeOut: 2000})
            }
        })
    }
}