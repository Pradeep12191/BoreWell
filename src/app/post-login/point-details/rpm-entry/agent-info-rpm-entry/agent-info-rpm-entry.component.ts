import { Component, Input } from '@angular/core';
import { ConfigService } from '../../../../services/config.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { RpmEntryService } from '../rpm-entry.service';

@Component({
    selector: 'agent-info-rpm-entry',
    templateUrl: './agent-info-rpm-entry.component.html',
    styleUrls: ['./agent-info-rpm-entry.component.scss']
})
export class AgentInfoRpmEntryComponent {

    public appearance;
    @Input() agents;
    @Input() form: FormGroup;

    private routeSubscription;

    constructor(
        private config: ConfigService,
        private route: ActivatedRoute,
        private res: RpmEntryService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }

    onAgentSelect(event: MatSelectChange) {
        this.res.agentChange(event.value);
    }

}