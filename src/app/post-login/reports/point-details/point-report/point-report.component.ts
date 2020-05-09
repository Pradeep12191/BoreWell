import { Component, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Column } from '../../../../expand-table/Column';
import { MatTableDataSource, MatSelect } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import * as moment from 'moment';
import { Moment } from 'moment';
import { ConfigService } from '../../../../services/config.service';
import { FADE_IN_ANIMATION } from '../../../../animations';
import { HttpClient } from '@angular/common/http';
import { Subscription, of } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import data from './point.sub.json';

declare let html2pdf: any;

import * as jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { Vehicle } from 'src/app/models/Vehicle';
import { debounceTime, switchMap, tap, finalize, catchError } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader-service';

const pointNoValidation = (control: AbstractControl) => {
    const fromPointNo = +control.get('from_rpm').value;
    const toPointNo = +control.get('to_rpm').value;
    if (fromPointNo && toPointNo && fromPointNo > toPointNo) {
        return {
            sheetNoGreater: true
        };
    }
    return null;
};

const dateValidation = (control: AbstractControl) => {
    const fromDate = control.get('from').value as Moment;
    const toDate = control.get('to').value as Moment;
    if (fromDate && toDate && fromDate.isAfter(toDate)) {
        return {
            dateGreater: true
        };
    }
    return null;
};

@Component({
    templateUrl: './point-report.component.html',
    styleUrls: ['./point-report.component.scss'],
    animations: [FADE_IN_ANIMATION]
})
export class PointReportComponent implements OnDestroy, AfterViewInit {
    render = false;
    public columns: Column[] = [
        { id: 'serialNo', name: 'COLUMN.SERIAL_NO', type: 'index', width: '15' },
        { id: 'pointno', name: 'POINT_ENTRY.COL.POINT_NO', type: 'string', width: '25' },
        { id: 'rig', name: 'POINT_ENTRY.COL.RIG', type: 'string', width: '30' },
        { id: 'edit', name: '', type: 'button', width: '10' },
        { id: 'delete', name: '', type: 'button', width: '10' },
        { id: 'more_details', name: '', type: 'toggle', width: '10', },
    ];
    searchCriterias = [
        { value: 'pointNo', display: 'Point No' },
        { value: 'date', display: 'Date' },
        { value: 'month', display: 'Month' },
    ]
    public pointDataSource: MatTableDataSource<any>;
    public points;
    public vehicles: Vehicle[];
    public searchForm: FormGroup;
    public appearance;
    public fetchingData;
    public pointUrl;
    private routeSubscritpion: Subscription;
    private routeQuerySubscription: Subscription;
    public casingDetails = [];
    public view = 'list';
    @ViewChild('report', { read: ElementRef, static: false }) reportEl: ElementRef;
    @ViewChild('vehicleSelect', { static: false }) vehicleSelect: MatSelect;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private config: ConfigService,
        private http: HttpClient,
        private auth: AuthService,
        private toastr: ToastrService,
        private loader: LoaderService
    ) {
        // this.loadStub();
        this.appearance = this.config.getConfig('formAppearance');
        this.routeSubscritpion = this.route.data.subscribe((data) => {
            if (data) {
                if (data.points) {
                    this.points = data.points;
                    this.pointDataSource = new MatTableDataSource<any>(this.points);
                }

                this.vehicles = data.vehicles;
            }
        });

        this.routeQuerySubscription = this.route.queryParamMap.subscribe((queryParamMap) => {
            if (queryParamMap.get('view')) {
                this.view = queryParamMap.get('view');
            }

        });

        const apiUrl = this.config.getConfig('apiUrl');
        const pointUrl = this.config.getUrl('rpmReportSheet');
        this.pointUrl = apiUrl + pointUrl;

        this.searchForm = this.fb.group({
            point: this.fb.group({
                from_rpm: { value: '', disabled: true },
                to_rpm: { value: '', disabled: true }
            }, { validators: pointNoValidation }),
            vehicle: '',
            date: this.fb.group({
                from: '',
                to: ''
            }, { validators: dateValidation }),
            month: '',
            criteria: { value: 'pointNo', disabled: true },
        });

        this.searchForm.get('point').valueChanges.pipe(
            tap(() => {
                const pointCtrl = this.searchForm.get('point');
                if (pointCtrl.valid) {
                    this.fetchingData = true;
                } else {
                    this.fetchingData = false;
                }
            }),
            debounceTime(500),
            switchMap(() => {
                const searchCriteria = this.searchForm.get('criteria').value;
                const params = this.getParams(searchCriteria);
                if (!params) {
                    return of(null);
                }
                return this.fetchData(params).pipe(
                    finalize(() => this.fetchingData = false),
                    catchError((err) => {
                        this.toastr.error('Error while fetching point data', null, { timeOut: 2000 });
                        return of(err);
                    })
                );
            })
        ).subscribe((points) => {
            if (points) {
                this.bindData(points);
            }
        });

        this.searchForm.get('date').valueChanges.pipe(
            tap(() => {
                const dateCtrl = this.searchForm.get('date');
                if (dateCtrl.valid) {
                    this.fetchingData = true;
                } else {
                    this.fetchingData = false;
                }
            }),
            debounceTime(500),
            switchMap(() => {
                const searchCriteria = this.searchForm.get('criteria').value;
                const params = this.getParams(searchCriteria);
                if (!params) {
                    return of(null);
                }
                return this.fetchData(params).pipe(
                    finalize(() => this.fetchingData = false),
                    catchError((err) => {
                        this.toastr.error('Error while fetching point data', null, { timeOut: 2000 });
                        return of(err);
                    })
                );
            })
        ).subscribe((points) => {
            if (points) {
                this.bindData(points);
            }
        });

        this.searchForm.get('month').valueChanges.pipe(
            tap(() => this.fetchingData = true),
            debounceTime(500),
            switchMap(() => {
                const searchCriteria = this.searchForm.get('criteria').value;
                const params = this.getParams(searchCriteria);
                if (!params) {
                    return of(null);
                }
                return this.fetchData(params).pipe(
                    finalize(() => this.fetchingData = false),
                    catchError((err) => {
                        this.toastr.error('Error while fetching point data', null, { timeOut: 2000 });
                        return of(err);
                    })
                );
            })
        ).subscribe((points) => {
            if (points) {
                this.bindData(points);
            }
        });
    }

    ngAfterViewInit() {
        if (this.vehicleSelect) {
            setTimeout(() => {
                this.vehicleSelect.open();
            });
            this.vehicleSelect._closedStream.subscribe(() => {
                if (this.searchForm.get('vehicle').value) {
                    this.searchForm.enable({ emitEvent: false });
                }
            });
        }
        setTimeout(() => {
            this.render = true;
        }, 750);
    }

    ngOnDestroy() {
        if (this.routeSubscritpion) { this.routeSubscritpion.unsubscribe(); }
        if (this.routeQuerySubscription) { this.routeQuerySubscription.unsubscribe(); }
    }

    downloadPdf() {
        const params = this.getParams(this.searchForm.value.criteria);
        const reportUrl = this.config.getConfig('reportUrl') + 'point-entry';
        this.loader.showSaveLoader('Generating Report...');
        this.http.get(reportUrl, {
            params, headers: { Accept: 'application/pdf' },
            responseType: 'arraybuffer'
        }).pipe(finalize(() => {
            this.loader.hideSaveLoader();
        })).subscribe((response) => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const fileURL = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = 'point-entry.pdf';
            link.click();

            // window.URL.revokeObjectURL(fileURL);
            // window.open(fileURL);
            this.toastr.success('Report Genererated Successfully', 'Success', { timeOut: 3000 });
        });
    }

    private getParams(criteria) {
        const vehicle_id = this.searchForm.value.vehicle.vehicle_id;
        switch (criteria) {
            case 'pointNo':
                if (this.searchForm.get('point').valid) {
                    let from_rpm = this.searchForm.value.point.from_rpm;
                    let to_rpm = this.searchForm.value.point.to_rpm;
                    from_rpm = from_rpm || to_rpm;
                    to_rpm = to_rpm || from_rpm;
                    return { from_rpm, to_rpm, vehicle_id };
                }
                break;
            case 'date':
                if (this.searchForm.get('date').valid) {
                    let from_date = this.searchForm.value.date.from;
                    let to_date = this.searchForm.value.date.to;
                    from_date = from_date || to_date;
                    to_date = to_date || from_date;
                    from_date = (from_date as Moment).format('YYYY-MM-DD');
                    to_date = (to_date as Moment).format('YYYY-MM-DD');
                    return { from_date, to_date, vehicle_id };
                }
                break;
            case 'month':
                const month = this.searchForm.value.month;
                if (month) {
                    const startOfMonth = (month as Moment).startOf('month').format('YYYY-MM-DD');
                    const endOfMonth = (month as Moment).endOf('month').format('YYYY-MM-DD');
                    return { vehicle_id, from_date: startOfMonth, to_date: endOfMonth }
                }
                break;
        }
    }

    getMessage() {
        if (this.searchForm.get('date').invalid) {
            return 'To Date should be greater than From Date';
        }
        if (this.searchForm.get('point').invalid) {
            return 'To Point No should be greater than From Point No';
        }
    }

    bindData(points) {
        this.points = points;
        this.pointDataSource = new MatTableDataSource<any>(points);
    }

    fetchData(params) {
        this.fetchingData = true;
        const user_id = this.auth.userid;
        params = { ...params, user_id };
        return this.http.get(this.pointUrl, { params });
    }

    onChange() {
        this.searchForm.enable({ emitEvent: false });
        const searchCriteria = this.searchForm.get('criteria').value;
        const params = this.getParams(searchCriteria);
        this.fetchingData = true;
        this.fetchData(params).pipe(
            finalize(() => this.fetchingData = false),
            catchError((err) => {
                this.toastr.error('Error while fetching point data', null, { timeOut: 2000 });
                return of(err);
            })
        ).subscribe((points) => {
            if (points) {
                this.bindData(points);
            }
        });
    }

    onCriteriaChange() {
        (this.searchForm.get('point') as FormGroup).reset({ from_rpm: '', to_rpm: '' }, { emitEvent: false });
        (this.searchForm.get('date') as FormGroup).reset({ from: '', to: '' }, { emitEvent: false });
        (this.searchForm.get('month') as FormGroup).reset('', { emitEvent: false });
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