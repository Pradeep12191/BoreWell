import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from '../../../../services/config.service';


@Component({
    templateUrl: './rpm-entry-confirm-dialog.component.html',
    styleUrls: ['./rpm-entry-confirm-dialog.component.scss']
})
export class RpmEntryConfirmDialogComponent {
    rpmEntryPostUrl;
    rpmEntry;
    agentName;
    payload;
    constructor(
        private http: HttpClient,
        @Inject(MAT_DIALOG_DATA) data,
        private toastr: ToastrService,
        private config: ConfigService,
        private matDialogRef: MatDialogRef<RpmEntryConfirmDialogComponent>
    ) {
        this.rpmEntry = data.formValue;
        this.payload = data.payload;
        this.agentName = data.agentName;
        this.rpmEntryPostUrl = this.config.getAbsoluteUrl('RPMEntry');
    }

    save() {
        if (this.rpmEntryPostUrl) {
            this.http.post(this.rpmEntryPostUrl, this.payload).subscribe(() => {
                this.toastr.success('Point Save successfully', null, { timeOut: 1500 });
                this.matDialogRef.close();
            }, (err) => {
                if (err) {
                    this.toastr.error('Error while saving Point', null, { timeOut: 1500 })
                }
            })
        }
    }
}