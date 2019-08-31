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
    agents: any[];
    agentDataSource: MatTableDataSource<any>;
    public columns: Column[] = [
        { id: 'serialNo', name: 'COLUMN.SERIAL_NO', type: 'index', width: '20' },
        { id: 'name', name: 'ADD_AGENT.NAME', type: 'string', width: '25' },
        { id: 'type', name: 'ADD_AGENT.TYPE', type: 'string', width: '25' },
        { id: 'edit', name: '', type: 'button', width: '10' },
        { id: 'delete', name: '', type: 'button', width: '10' },
        { id: 'more_details', name: '', type: 'toggle', width: '10', },
    ]

    public casingDeatils = [
        { name: '7\'Inch', key: 'inch7DepthRate' },
        { name: '10\'Inch', key: 'inch10DepthRate' },
        { name: '12\'Inch', key: 'inch12DepthRate' },
        { name: 'MS Medium', key: 'msHeavyDepthRate' },
        { name: 'MS Heavy', key: 'msMediumDepthRate' },
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
                this.agents.forEach(agent => {
                    agent.newBore['casingArray'] = [];
                    agent.reBore['casingArray'] = [];
                    this.casingDeatils.forEach(casingDetail => {
                        if (agent.newBore.casing[casingDetail.key]) {
                            agent.newBore['casingArray'].push({
                                name: casingDetail.name,
                                depthRate: agent.newBore.casing[casingDetail.key]
                            })
                        }
                        if (agent.newBore.casing[casingDetail.key]) {
                            agent.reBore['casingArray'].push({
                                name: casingDetail.name,
                                depthRate: agent.reBore.casing[casingDetail.key]
                            })
                        }
                    })
                })
                this.agentDataSource = new MatTableDataSource(this.agents);
            }
        });

    }
}