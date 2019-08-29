import { Component } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

    ) {

    }
}