import { Component } from '@angular/core';
import { Column } from '../../../../expand-table/Column';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
    templateUrl: './view-hammer.component.html',
    styleUrls: ['./view-hammer.component.scss']
})
export class ViewHammerComponent {
    public columns: Column[] = [
        { id: 'serialNo', name: 'COLUMN.SERIAL_NO', type: 'index', width: '15' },
        { id: 'name', name: 'ADD_HAMMER.COL_TITLE.NAME', type: 'string', width: '30' },
        { id: 'number', name: 'ADD_HAMMER.COL_TITLE.NUMBER', type: 'string', width: '25' },
        { id: 'edit', name: '', type: 'button', width: '10' },
        { id: 'delete', name: '', type: 'button', width: '10' },
        { id: 'more_details', name: '', type: 'toggle', width: '10', },
    ]
    public hammerDataSource: MatTableDataSource<any>;

    constructor(
        private route: ActivatedRoute
    ) {
        this.route.data.subscribe((data) => {
            if (data && data.hammers) {
                this.hammerDataSource = new MatTableDataSource(data.hammers);
            }
        })
    }
}