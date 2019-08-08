import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Column } from '../../../../expand-table/Column';
import { MediaObserver } from '@angular/flex-layout';

@Component({
    templateUrl: './view-agent.component.html',
    styleUrls: ['./view-agent.component.scss']
})
export class ViewAgentComponent {
    agents
    agentDataSource: MatTableDataSource<any>;
    public columns: Column[] = [
        { id: 'serialNo', name: 'COLUMN.SERIAL_NO', type: 'index', width: '20' },
        { id: 'name', name: 'ADD_AGENT.NAME', type: 'string', width: '25' },
        { id: 'type', name: 'ADD_AGENT.TYPE', type: 'string', width: '25' },
        { id: 'edit', name: '', type: 'button', width: '10' },
        { id: 'delete', name: '', type: 'button', width: '10' },
        { id: 'more_details', name: '', type: 'toggle', width: '10', },
    ]

    get isMobile() {
        return this.mediaObs.isActive('lt-md');
    }

    constructor(
        private route: ActivatedRoute,
        private mediaObs: MediaObserver
    ) {
        this.route.data.subscribe((data: { agents: any[] }) => {
            if (data && data.agents) {
                this.agents = data.agents;
                this.agentDataSource = new MatTableDataSource(this.agents);
            }
        });

    }
}