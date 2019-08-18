import { Component, Input, OnInit, ContentChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Column } from './Column';
import { MediaObserver } from '@angular/flex-layout';
import { ExpandDetailsDirective } from './expand-deatils.directive';
import { ROTATE_ARROW_ANIMATION, EXPAND } from '../animations';

@Component({
    selector: 'expand-table',
    templateUrl: './expand-table.component.html',
    styleUrls: ['./expand-table.component.scss'],
    animations: [EXPAND, ROTATE_ARROW_ANIMATION]
})
export class ExpandTableComponent implements OnInit {
    @Input() columns: Column[];
    @Input() data: any[];
    @Input() dataSource: MatTableDataSource<any>;
    @Input() expandFirstRow;
    @ContentChild(ExpandDetailsDirective, { read: TemplateRef, static: false }) detailsTpl: TemplateRef<ExpandDetailsDirective>;
    displayedColumns = [];
    expandedRow;

    constructor(
        private mediaObs: MediaObserver
    ) {

    }

    ngOnInit() {
        this.displayedColumns = this.columns.map(col => col.id);
        if (this.mediaObs.isActive('lt-md')) {
            this.displayedColumns = this.columns.filter(col => !col.isDesktopOnly).map(col => col.id);
        }
        if (this.expandFirstRow) {
            if (this.data && this.data.length) {
                this.expandedRow = this.data[0]
            }
        }
    }
}