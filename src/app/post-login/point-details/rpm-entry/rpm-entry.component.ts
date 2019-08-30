import { Component } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RpmEntryConfirmDialogComponent } from './rpm-entry-confirm-dialog/rpm-entry-confirm-dialog.component';
import { MediaObserver } from '@angular/flex-layout';

@Component({
    styleUrls: ['./rpm-entry.component.scss'],
    templateUrl: './rpm-entry.component.html'
})
export class RpmEntryComponent {
    todayDate = new Date();
    appearance;
    routeSubscription: Subscription;
    agents;
    constructor(
        private dialog: MatDialog,
        private media: MediaObserver
    ) {

    }

    openConfirmDialog() {
        this.dialog.open(RpmEntryConfirmDialogComponent, {
            panelClass: 'confirm-dialog',
            height:  this.media.isActive('lt-md') ? '100vh' : 'auto',
            width: this.media.isActive('lt-md') ? '100vw' : '80vw',
            maxWidth: this.media.isActive('lt-md') ? '100vw' : '80vw',
            position: { top: '0px' }
        })
    }
}