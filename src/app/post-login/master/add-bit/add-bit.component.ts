import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { AddDistributorDialogComponent } from '../dialog/add-distributor/add-distributor.dialog.component';
import { AddBitSizeDialogComponent } from './dialog/add-size/add-size.dialog.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../services/common.service';
import { Moment } from 'moment';

@Component({
    templateUrl: './add-bit.component.html',
    styleUrls: ['./add-bit.component.scss']
})
export class AddBitComponent implements OnInit {
    appearance;
    addBitForm: FormGroup;
    baseUrl;
    url;
    routeSubscription: Subscription
    types = [
        { value: 'new', display: 'New' },
        { value: 'new', display: 'Old' }
    ];
    distributors = [
    ];
    vehicles = [
        { value: '1', display: 'KA01MP7396' },
        { value: '2', display: 'KA01MP7396' },
    ];
    drillings = [
        { value: 'drilling bit', display: 'Drilling Bit' },
        { value: 'ob bit', display: 'OB Bit' }
    ];
    sizes = [
    ]
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
        const bitUrl = this.configService.getUrl('addBit');
        this.baseUrl = this.configService.getConfig('apiUrl');
        this.url = this.baseUrl + bitUrl;
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data) {
                if (data.bitSizes) {
                    this.sizes = data.bitSizes
                }
                if (data.distributors) {
                    this.distributors = data.distributors
                }
                if (data.vehicles) {
                    this.vehicles = data.vehicles;
                }
            }
        })
    }

    ngOnInit() {
        this.addBitForm = this.fb.group({
            purchaseDate: [null, Validators.required],
            type: null,
            drilling: [null, Validators.required],
            vehicle: [null, Validators.required],
            name: [null, Validators.required],
            distributorDetails: [null, Validators.required],
            size: [null, Validators.required],
            number: [null, Validators.required],
            intialScale: [null, Validators.required]
        })
    }

    openAddDistributorDialog() {
        const dialogRef = this.dialog.open(AddDistributorDialogComponent,
            {
                data: {
                    title: 'ADD_BIT.BIT_DISTRIBUTOR.TITLE',
                    name: {
                        label: 'ADD_BIT.BIT_DISTRIBUTOR.NAME',
                        control: 'distributor_name'
                    },
                    address: {
                        label: 'ADD_BIT.BIT_DISTRIBUTOR.ADDRESS',
                        control: 'distributor_address'
                    },
                    urlName: 'addbit_distributor',
                }
            }
        )
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.distributors.push({
                    distributor_name: result.distributor_name
                })
            }
        })
    }

    openAddSizeDialog() {
        const sizeDialog = this.dialog.open(AddBitSizeDialogComponent, {
            data: { title: 'ADD_BIT.BIT_SIZE.TITLE' }
        })
        sizeDialog.afterClosed().subscribe((result) => {
            if (result) {
                this.sizes.push({ size: result.size })
            }
        })
    }

    resetForm() {
        this.addBitForm.reset();
        this.common.scrollTop();
    }

    saveBit() {
        console.log(JSON.stringify(this.addBitForm.value, null, 2));
        if (this.url) {
            this.http.post(this.url, {
                ...this.addBitForm.value,
                purchaseDate: this.addBitForm.value.purchaseDate ? (this.addBitForm.value.purchaseDate as Moment).format('DD/MM/YYYY') : null
            }).subscribe((response) => {
                this.toastr.success('Bit Added Sucessfully', null, { timeOut: 1500 })
                this.addBitForm.reset();
                this.common.scrollTop();
            }, (err) => {
                if (err) {
                    this.toastr.error('Error while saving Bit', null, { timeOut: 1500 })
                }

            });
        }
    }

    // onDateChange(event: MatDatepickerInputEvent<Moment>) {
    //    this.addBitForm.get('purchaseDate').setValue(event.value.format('DD/MM/YYYY'))
    // }
}