import { Component } from '@angular/core';

import { SIDE_NAV_ITEMS } from './data'
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { NavItem, FlatNode } from './models';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeNestedDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bore-well-app';
  openSideNav = true;
  isSmallDevice;
  sideNavItems = SIDE_NAV_ITEMS;

  // private _transformer = (node: NavItem, level: number) => {
  //   return {
  //     expandable: !!node.children && node.children.length > 0,
  //     name: node.name,
  //     level: level,
  //     isMain: node.isMain
  //   };
  // }

  // treeControl = new FlatTreeControl<FlatNode>(
  //   node => node.level, node => node.expandable);

  // treeFlattener = new MatTreeFlattener(
  //   this._transformer, node => node.level, node => node.expandable, node => node.children);

  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // constructor() {
  //   this.dataSource.data = SIDE_NAV_ITEMS;
  // }

  // hasChild = (_: number, node: FlatNode) => node.expandable;

  treeControl = new NestedTreeControl<NavItem>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavItem>();

  constructor() {
    this.dataSource.data = SIDE_NAV_ITEMS;
  }

  hasChild = (_: number, node: NavItem) => !!node.children && node.children.length > 0;

}
