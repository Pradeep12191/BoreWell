import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './add-distributor.dialog.component.html',
    styleUrls: ['./add-distributor.dialog.component.scss']
})
export class AddDistributorDialogComponent {
    title;
    addDistributorForm: FormGroup;
    appearance;
    distributorUrl;
    constructor(
        @Inject(MAT_DIALOG_DATA) private data,
        private fb: FormBuilder,
        private config: ConfigService,
        private http: HttpClient,
        private toastr: ToastrService,
        private dialogRef: MatDialogRef<AddDistributorDialogComponent>
    ) {
        this.title = data.title;
        const baseUrl = this.config.getConfig('apiUrl');
        const url = this.config.getUrl('addbit_distributor');
        this.distributorUrl = baseUrl + url;
        this.addDistributorForm = this.fb.group({
            distributor_name: [null, Validators.required],
            distributor_address: [null, Validators.required]
        })
        this.appearance = this.config.getConfig('formAppearance');
    }

    sumbit() {
        if (this.addDistributorForm.invalid) {
            this.addDistributorForm.markAllAsTouched()
            return;
        }
        this.http.post(this.distributorUrl, this.addDistributorForm.value)
            .subscribe((response) => {
                this.dialogRef.close(this.addDistributorForm.value)
                this.toastr.success('Distributor added successfully', null, { timeOut: 1500 })
            }, (err: HttpErrorResponse) => {
                if (err) {
                    this.toastr.error('Error while adding distributor')
                }
            })
    }
}