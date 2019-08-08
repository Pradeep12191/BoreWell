import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../services/config.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'agent-info',
    templateUrl: 'agent-info.component.html',
    styleUrls: ['agent-info.component.scss']
})
export class AgentInfoComponent implements OnDestroy {
    @Input() form: FormGroup;
    appearance;
    routeDataSubscription: Subscription;
    states;
    types = [
        { value: 1, display: 'Main Agent' },
        { value: 2, display: 'Sub Agent' }
    ]
    constructor(
        private config: ConfigService,
        private route: ActivatedRoute
    ) {
        this.routeDataSubscription = this.route.data.subscribe((data) => {
            if (data.states && data.states.length) {
                this.states = data.states.filter((state) => !(state.state === 'ALL INDIA PERMIT'))
            }
            if (data.agentTypes && data.agentTypes.length) {
                this.types = data.agentTypes
            }
        })
        this.appearance = this.config.getConfig('formAppearance')
    }

    ngOnDestroy() {
        if (this.routeDataSubscription) {
            this.routeDataSubscription.unsubscribe()
        }

    }
}