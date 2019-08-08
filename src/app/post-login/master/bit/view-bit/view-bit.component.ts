import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bit } from '../Bit';
import { MatTableDataSource } from '@angular/material';
import { MediaObserver } from '@angular/flex-layout';
import { Column } from '../../../../expand-table/Column';

@Component({
    templateUrl: './view-bit.component.html',
    styleUrls: ['./view-bit.component.scss']
})
export class ViewBitComponent {
    bits: Bit[];
    expandedBit;
    bitDataSource: MatTableDataSource<Bit>;
    public columns: Column[] = [
        { id: 'serialNo', name: 'COLUMN.SERIAL_NO', type: 'index', width: '10' },
        { id: 'name', name: 'ADD_BIT.NAME', type: 'string', width: '30' },
        { id: 'size', name: 'ADD_BIT.SIZE', type: 'string', width: '30' },
        { id: 'edit', name: '', type: 'button', width: '10' },
        { id: 'delete', name: '', type: 'button', width: '10' },
        { id: 'more_details', name: '', type: 'toggle', width: '10', },
    ]
    sticky = true;
    isMobile = false;
    constructor(
        private route: ActivatedRoute,
        private mediaObs: MediaObserver
    ) {
        this.route.data.subscribe((data: { bits: Bit[] }) => {
            if (data && data.bits) {
                this.bits = data.bits;
                this.bitDataSource = new MatTableDataSource<Bit>(this.bits);
            }
        });

        this.sticky = false;
        this.isMobile = true;

        if (this.mediaObs.isActive('lt-md')) {
            // this.displayedColumns = ['serialNo', 'name', 'size', 'edit', 'delete', 'more_details'];
            // this.sticky = false;
            // this.isMobile = true;
        }

    }

    private addMoreDetailsColumn() {
        this.bits.forEach(() => {

        })
    }

}