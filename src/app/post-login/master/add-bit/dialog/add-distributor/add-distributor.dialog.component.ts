import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './add-distributor.dialog.component.html',
    styleUrls: ['./add-distributor.dialog.component.scss']
})
export class AddDistributorDialogComponent {
    title;
    constructor(@Inject(MAT_DIALOG_DATA) private data) {
        this.title = data.title
    }
}