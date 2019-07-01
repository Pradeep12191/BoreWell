import { Component, OnInit } from '@angular/core';

import { SIDE_NAV_ITEMS } from '../data'
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { NavItem, FlatNode } from '../models';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeNestedDataSource } from '@angular/material';

@Component({
  selector: 'app-post-login',
  templateUrl: './post-login.component.html',
  styleUrls: ['./post-login.component.scss']
})
export class PostLoginComponent implements OnInit {

  title = 'bore-well-app';
  openSideNav = true;
  isSmallDevice;
  sideNavItems = SIDE_NAV_ITEMS;


  treeControl = new NestedTreeControl<NavItem>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavItem>();

  constructor() {
    this.dataSource.data = SIDE_NAV_ITEMS;
  }

  hasChild = (_: number, node: NavItem) => !!node.children && node.children.length > 0;

  ngOnInit(){

  }

}
