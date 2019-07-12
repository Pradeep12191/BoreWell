import { Component, Output, EventEmitter } from '@angular/core';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeNestedDataSource } from '@angular/material';
import { SIDE_NAV_ITEMS } from '../../data';
import { EXPAND } from '../../animations';

@Component({
    selector: 'mobile-sidenav',
    templateUrl: './mobile-sidenav.component.html',
    styleUrls: ['./mobile-sidenav.component.scss'],
    animations: [EXPAND]
})
export class MobileSidenavComponent {
    treeControl = new NestedTreeControl<any>(node => node.children);
    dataSource = new MatTreeNestedDataSource<any>();
    activeMainNode;
    activeSubNode;

    @Output() linkClick = new EventEmitter();

    constructor() {
        this.dataSource.data = SIDE_NAV_ITEMS;
    }
    hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

    isExpand(node) {
        if (node.isMain) {
            return this.activeMainNode === node ?'expanded' : 'collapsed'
        }
        return this.activeSubNode === node ? 'expanded' : 'collapsed'
    }

    setActive(node){
        if(node.isMain){
            this.activeMainNode = this.activeMainNode === node ? null : node;
        }
        return this.activeSubNode = this.activeSubNode === node ? null : node;
    }
}