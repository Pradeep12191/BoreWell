import { Component, Input } from '@angular/core';
import { ConfigService } from '../../../../services/config.service';
import { FormGroup } from '@angular/forms';
import { MatRadioChange, MatSelectChange } from '@angular/material';
import { PointEntryService } from '../point-entry.service';
import { AuthService } from '../../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FADE_IN_ANIMATION } from '../../../../animations';
import { Agent } from '../../../../models/Agent';

@Component({
    selector: 'point',
    templateUrl: './point.component.html',
    styleUrls: ['./point.component.scss'],
    animations: [FADE_IN_ANIMATION]
})
export class PointComponent {
    appearance;
    @Input() form: FormGroup;
    pointOption = 'self';
    agentLoading;
    agentListUrl;
    agentList: Agent[];
    agentNames;
    constructor(
        private config: ConfigService,
        private pes: PointEntryService,
        private auth: AuthService,
        private http: HttpClient
    ) {
        this.agentListUrl = this.config.getAbsoluteUrl('viewagentlist') + '/' + this.auth.username;
        this.appearance = this.config.getConfig('formAppearance');
    }

    onPointOptionChange(event: MatRadioChange) {

        this.pointOption = event.value;
        this.agentList = null;
        this.pes.pointOptionChanged({ optionName: event.value, data: null });
        this.agentNames = null;
        this.form.get('agentName').setValue('');

        if (event.value === 'agent') {
            this.agentLoading = true;
            this.http.get<Agent[]>(this.agentListUrl).subscribe((agents) => {
                this.pes.pointOptionChanged({ optionName: event.value, data: agents });
                this.agentLoading = false;
                this.agentList = agents;
                this.agentNames = this.agentList.map(agent => agent.name);
            }, (err) => {
                if (err) {
                    this.agentLoading = false;
                    this.agentList = null;
                    this.form.get('agentName').setValue('');
                }
            })
        }

    }

    onAgentSelectChange(event: MatSelectChange) {
        this.pes.agentChanged(event);
    }
}