import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { AddDistributorDialogComponent } from '../dialog/add-distributor/add-distributor.dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../services/common.service';
import { Moment } from 'moment';

@Component({
    templateUrl: './add-hammer.component.html',
    styleUrls: ['./add-hammer.component.scss']
})
export class AddHammerComponent implements OnInit, OnDestroy {
    routeSubscription: Subscription
    appearance;
    addHammerForm: FormGroup;
    url;
    baseUrl;
    companies = [];
    distributors = [];
    rigs = [];
    constructor(
        private configService: ConfigService,
        private fb: FormBuilder,
        private http: HttpClient,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private common: CommonService
    ) {
        this.appearance = this.configService.getConfig('formAppearance');
        const hammerUrl = this.configService.getUrl('addHammer');
        this.baseUrl = this.configService.getConfig('apiUrl');
        this.url = this.baseUrl + hammerUrl;
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data) {
                if (data.companies) {
                    this.companies = data.companies;
                }
                if (data.distributors) {
                    this.distributors = data.distributors
                }
                if (data.rigs) {
                    this.rigs = data.rigs
                }
            }
        })
    }

    ngOnInit() {
        this.addHammerForm = this.fb.group({
            purchaseDate: [null, Validators.required],
            name: [null, Validators.required],
            companyName: null,
            distributorDetails: null,
            rig: [null, Validators.required],
            number: [null, Validators.required],
            barrelScale: [null, Validators.required],
            spechSetSize: null,
            pistonNumber: [null, Validators.required],
            controlTubeNumber: [null, Validators.required]
        })
    }

    ngOnDestroy() {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe()
        }
    }

    openAddNewCompanyDialog() {
        const dialogRef = this.dialog.open(AddDistributorDialogComponent, {
            data: {
                title: 'ADD_HAMMER.COMPANY.TITLE',
                name: {
                    label: 'ADD_HAMMER.COMPANY.NAME',
                    control: 'company_name'
                },
                address: {
                    label: 'ADD_HAMMER.COMPANY.ADDRESS',
                    control: 'company_address'
                },
                urlName: 'addHammer_company'
            }
        })
        dialogRef.afterClosed().subscribe(({ company_name }) => {
            this.companies.push({ company_name })
        })
    }

    openAddDistributor() {
        const dialogRef = this.dialog.open(AddDistributorDialogComponent, {
            data: {
                title: 'ADD_HAMMER.DISTRIBUTOR.TITLE',
                name: {
                    label: 'ADD_HAMMER.DISTRIBUTOR.NAME',
                    control: 'distributor_name'
                },
                address: {
                    label: 'ADD_HAMMER.DISTRIBUTOR.ADDRESS',
                    control: 'distributor_address'
                },
                urlName: 'addHammer_distributor'
            }
        })
        dialogRef.afterClosed().subscribe(({ distributor_name }) => {
            this.distributors.push({ distributor_name })
        })
    }

    saveHammer() {
        console.log(JSON.stringify(this.addHammerForm.value, null, 2));
        if (this.url) {
            this.http.post(this.url, {
                ...this.addHammerForm.value,
                purchaseDate: this.addHammerForm.value.purchaseDate ? (this.addHammerForm.value.purchaseDate as Moment).format('DD/MM/YYYY') : null
            }).subscribe((response) => {
                this.toastr.success('Hammer Added Sucessfully', null, { timeOut: 1500 })
                this.addHammerForm.reset();
                this.common.scrollTop();
            }, (err) => {
                if (err) {
                    this.toastr.error('Error while saving Hammer', null, { timeOut: 1500 })
                }
            });
        }
    }
}