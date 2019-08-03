import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bit } from '../Bit';
import { MatTableDataSource } from '@angular/material';

@Component({
    templateUrl: './view-bit.component.html',
    styleUrls: ['./view-bit.component.scss']
})
export class ViewBitComponent {
    bits: Bit[];
    bitDataSource: MatTableDataSource<Bit>;
    displayedColumns: string[] = ['serialNo', 'name', 'size', 'number', 'purchaseDate', 'type', 'drilling', 'distributorDetails', 'intialScale', 'edit', 'delete', ];
    constructor(
        private route: ActivatedRoute
    ) {
        this.route.data.subscribe((data: { bits: Bit[] }) => {
            if (data && data.bits) {
                this.bits = data.bits;
                this.bitDataSource = new MatTableDataSource<Bit>(this.bits);
            }
        })
    }

}