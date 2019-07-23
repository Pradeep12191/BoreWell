import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './add-size.dialog.component.html',
    styleUrls: ['./add-size.dialog.component.scss']
})
export class AddBitSizeDialogComponent {
    title;
    sizeUrl;
    sizeForm: FormGroup;
    appearance;
    constructor(
        @Inject(MAT_DIALOG_DATA) private data,
        private fb: FormBuilder,
        private config: ConfigService,
        private http: HttpClient,
        private toastr: ToastrService,
        private dialogRef: MatDialogRef<AddBitSizeDialogComponent>
    ) {
        this.title = data.title;
        const baseUrl = this.config.getConfig('apiUrl');
        const url = this.config.getUrl('addbit_size');
        this.sizeUrl = baseUrl + url;
        this.sizeForm = this.fb.group({
            size: [null, Validators.required]
        })
        this.appearance = this.config.getConfig('formAppearance');
    }

    sumbit() {
        if (this.sizeForm.invalid) {
            this.sizeForm.markAllAsTouched();
            return;
        }
        this.http.post(this.sizeUrl, this.sizeForm.value).subscribe(() => {
            this.toastr.success('Bit size added successfully.')
            this.dialogRef.close(this.sizeForm.value)
        }, (err: HttpErrorResponse) => {
            if (err) {
                this.toastr.error('Error while adding bit size')
            }
        })
    }
}