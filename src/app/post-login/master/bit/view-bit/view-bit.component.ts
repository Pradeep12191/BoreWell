import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bit } from '../Bit';
import { MatTableDataSource } from '@angular/material';
import { MediaObserver } from '@angular/flex-layout';
import { EXPAND, ROTATE_ARROW_ANIMATION } from '../../../../animations';

@Component({
    templateUrl: './view-bit.component.html',
    styleUrls: ['./view-bit.component.scss'],
    animations: [EXPAND, ROTATE_ARROW_ANIMATION]
})
export class ViewBitComponent {
    bits: Bit[];
    expandedBit;
    bitDataSource: MatTableDataSource<Bit>;
    displayedColumns: string[] = ['serialNo', 'name', 'size', 'number', 'purchaseDate', 'type', 'drilling', 'distributorDetails', 'intialScale', 'edit', 'delete',];
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
        
        if (this.mediaObs.isActive('lt-md')) {
            this.displayedColumns = ['serialNo', 'name', 'size', 'edit', 'delete', 'more_details'];
            this.sticky = false;
            this.isMobile = true;
        }

    }

    private addMoreDetailsColumn() {
        this.bits.forEach(() => {

        })
    }

}