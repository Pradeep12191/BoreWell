import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { AddDistributorDialogComponent } from './dialog/add-distributor/add-distributor.dialog.component';
import { AddBitSizeDialogComponent } from './dialog/add-size/add-size.dialog.component';

@Component({
    templateUrl: './add-bit.component.html',
    styleUrls: ['./add-bit.component.scss']
})
export class AddBitComponent implements OnInit {
    appearance;
    addBitForm: FormGroup;
    baseUrl;
    url
    types = [
        { value: '1', display: 'New' },
        { value: '2', display: 'Old' }
    ];
    distributors = [
    ];
    vehicles = [
        { value: '1', display: 'KA01MP7396' },
        { value: '2', display: 'KA01MP7396' },
    ];
    drillings = [
        { value: '1', display: 'Drilling Bit' },
        { value: '2', display: 'OB Bit' }
    ];
    sizes = [
    ]
    constructor(
        private configService: ConfigService,
        private fb: FormBuilder,
        private http: HttpClient,
        private dialog: MatDialog
    ) {
        this.appearance = this.configService.getConfig('formAppearance');
        const bitUrl = this.configService.getUrl('addBit');
        this.baseUrl = this.configService.getConfig('apiUrl');
        this.url = this.baseUrl + bitUrl;
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
                data: { title: 'ADD_BIT.BIT_DISTRIBUTOR.TITLE' }
            }
        )
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.distributors.push({
                    value: result.distributor_name,
                    display: result.distributor_name
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
                this.sizes.push({ value: result.size, display: result.size })
            }
        })
    }

    saveBit() {
        console.log(JSON.stringify(this.addBitForm.value, null, 2));
        if (this.url) {
            this.http.post(this.url, this.addBitForm.value).subscribe((response) => {
                if (response) {
                    console.log(JSON.stringify(response, null, 2))
                } else {
                    console.log('No Response')
                }
            });
        }
    }
}