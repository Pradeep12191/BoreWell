import { Component, Input } from '@angular/core';
import { ConfigService } from '../../../../services/config.service';

@Component({
    selector: 'agent-re-bore',
    templateUrl: './agent-re-bore.component.html',
    styleUrls: ['./agent-re-bore.component.scss']
    
})
export class AgentReBoreComponent{
    @Input('form') reBoreForm;
    appearance;

    constructor (
        private config: ConfigService
    ) {
        this.appearance = this.config.getConfig('formAppearance');
    }
}