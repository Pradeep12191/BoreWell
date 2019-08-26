import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Column } from '../../../../expand-table/Column';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';
import { ConfigService } from '../../../../services/config.service';
import { FADE_IN_ANIMATION } from '../../../../animations';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import data from './point.sub.json';

declare let html2pdf: any;

import * as jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

@Component({
    templateUrl: './point-report.component.html',
    styleUrls: ['./point-report.component.scss'],
    animations: [FADE_IN_ANIMATION]
})
export class PointReportComponent implements OnDestroy {
    public columns: Column[] = [
        { id: 'serialNo', name: 'COLUMN.SERIAL_NO', type: 'index', width: '15' },
        { id: 'pointno', name: 'POINT_ENTRY.COL.POINT_NO', type: 'string', width: '25' },
        { id: 'rig', name: 'POINT_ENTRY.COL.RIG', type: 'string', width: '30' },
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
    private routeQuerySubscription: Subscription;
    public casingDetails = [];
    public view = 'list';
    @ViewChild('report', { read: ElementRef, static: false }) reportEl: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private config: ConfigService,
        private http: HttpClient,
        private auth: AuthService,
        private toastr: ToastrService
    ) {
        // this.loadStub();
        console.log(html2pdf)
        this.appearance = this.config.getConfig('formAppearance');
        this.routeSubscritpion = this.route.data.subscribe((data) => {
            if (data) {
                if (data.points) {
                    this.points = data.points;
                    // this.points.forEach(point => {
                    //     this.generateCasingDetails(point)
                    // })
                    this.pointDataSource = new MatTableDataSource<any>(this.points);
                }
            }
        });

        this.routeQuerySubscription = this.route.queryParamMap.subscribe((queryParamMap) => {
            if (queryParamMap.get('view')) {
                this.view = queryParamMap.get('view');
            }

        })

        const apiUrl = this.config.getConfig('apiUrl');
        const pointUrl = this.config.getUrl('viewpointlist');
        this.pointUrl = apiUrl + pointUrl + '/' + this.auth.userid;

        this.dateForm = this.fb.group({
            date: [moment()],
            pointNo: ['', Validators.required]
        })
    }

    ngOnDestroy() {
        if (this.routeSubscritpion) { this.routeSubscritpion.unsubscribe(); }
        if (this.routeQuerySubscription) { this.routeQuerySubscription.unsubscribe(); }
    }

    loadStub() {
        this.points = data;
        this.pointDataSource = new MatTableDataSource<any>(this.points);
    }

    fetchData() {
        this.fetchingData = true;
        const selectedDate = (this.dateForm.get('date').value as moment.Moment).format('DD-MM-YYYY');
        const selectedPoint = this.dateForm.get('pointNo').value;
        this.http.get(this.pointUrl + '/' + selectedPoint).subscribe((points) => {
            this.fetchingData = false;
            this.points = points;
            this.pointDataSource = new MatTableDataSource<any>(this.points);
        }, (err) => {
            if (err) {
                this.fetchingData = false;
                this.toastr.error('Error while fetching point data', null, { timeOut: 2000 })
            }
        })
    }

    generateCasingDetails(point) {
        const pvc7Detail = {};
        const pvc10Detail = {};
        const pvc12Detail = {};
        const msHeavyDetail = {};
        const msMediumDetail = {};
        point['casingDetails'] = [];
        if (point.pvc7Depth || point.pvc7DepthRate || point.pvc7Amt) {
            pvc7Detail['name'] = "7\' Inch"
            pvc7Detail['depth'] = point.pvc7Depth;
            pvc7Detail['depthRate'] = point.pvc7DepthRate;
            pvc7Detail['totalAmount'] = point.pvc7Amt
            point.casingDetails.push(pvc7Detail)
        }
        if (point.pvc10Depth || point.pvc10DepthRate || point.pvc10Amt) {
            pvc10Detail['name'] = "PVC 10\' Inch"
            pvc10Detail['depth'] = point.pvc10Depth;
            pvc10Detail['depthRate'] = point.pvc10DepthRate;
            pvc10Detail['totalAmount'] = point.pvc10Amt
            point.casingDetails.push(pvc10Detail)
        }
        if (point.pvc12Depth || point.pvc12DepthRate || point.pvc12Amt) {
            pvc12Detail['name'] = "PVC 12\' Inch"
            pvc12Detail['depth'] = point.pvc12Depth;
            pvc12Detail['depthRate'] = point.pvc12DepthRate;
            pvc12Detail['totalAmount'] = point.pvc12Amt
            point.casingDetails.push(pvc12Detail)
        }
        if (point.msMediumDepth || point.msMediumDepthRate || point.msMediumAmt) {
            msMediumDetail['name'] = "MS Medium"
            msMediumDetail['depth'] = point.msMediumDepth;
            msMediumDetail['depthRate'] = point.msMediumDepthRate;
            msMediumDetail['totalAmount'] = point.msMediumAmt
            point.casingDetails.push(msMediumDetail)
        }
        if (point.msHeavyDepth || point.msHeavyDepthRate || point.msHeavyAmt) {
            msHeavyDetail['name'] = "MS Heavy"
            msHeavyDetail['depth'] = point.msHeavyDepth;
            msHeavyDetail['depthRate'] = point.msHeavyDepthRate;
            msHeavyDetail['totalAmount'] = point.msHeavyAmt
            point.casingDetails.push(msHeavyDetail)
        }

    }

    onDownloadPdf() {
        const opt = {
            margin: 0,
            filename: 'point_report',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
                scale: 3,
                letterRendering: true,
                useCORS: true
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', pagesplit: true }
        };

        const worker = html2pdf().from(this.reportEl.nativeElement).set(opt).save()
            .then(done => {
                console.log('succcess')
            }, (err) => {
                console.log(err)
            })
    }
}