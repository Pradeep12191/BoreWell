import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../services/config.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'agent-commission-particulars',
    templateUrl: 'agent-commission-particulars.component.html',
    styleUrls: ['agent-commission-particulars.component.scss']
})
export class AgentCommissionParticularsComponent implements OnDestroy {
    @Input() form: FormGroup;
    appearance;
    routeSubscription: Subscription;
    types = [];
    casingTypes = [];
    casingPaymentTypes = [];
    constructor(
        private config: ConfigService,
        private route: ActivatedRoute
    ) {
        this.appearance = this.config.getConfig('formAppearance');
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data) {
                if (data.casingPayments) {
                    this.casingPaymentTypes = data.casingPayments;
                }
                if (data.casingCommissions) {
                    this.casingTypes = data.casingCommissions
                }
                if (data.drillingCommissions) {
                    this.types = data.drillingCommissions
                }
            }
        })
    }

    ngOnDestroy() {
        if (this.routeSubscription) { this.routeSubscription.unsubscribe() }
    }
}