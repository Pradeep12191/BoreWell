import { Component } from '@angular/core';
import { ConfigService } from '../../../../services/config.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'agent-info-rpm-entry',
    templateUrl: './agent-info-rpm-entry.component.html',
    styleUrls: ['./agent-info-rpm-entry.component.scss']
})
export class AgentInfoRpmEntryComponent {

    public appearance;
    public agents;

    private routeSubscription;

    constructor(
        private config: ConfigService,
        private route: ActivatedRoute
    ) {
        this.appearance = this.config.getConfig('formAppearance');
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data) {
                if (data.agents) {
                    this.agents = data.agents;
                }
            }
        })
    }

}