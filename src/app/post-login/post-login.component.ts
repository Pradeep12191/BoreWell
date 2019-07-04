import { Component, OnInit } from '@angular/core';

import { SIDE_NAV_ITEMS } from '../data'
import { NestedTreeControl } from '@angular/cdk/tree';
import { NavItem } from '../models';
import { MatTreeNestedDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { MediaObserver } from '@angular/flex-layout';

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
  languages;


  treeControl = new NestedTreeControl<NavItem>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavItem>();

  constructor(
    private translate: TranslateService,
    private mediaObserver: MediaObserver
  ) {
    this.dataSource.data = SIDE_NAV_ITEMS;
    this.mediaObserver.media$.subscribe((media) => {
      if (media.mqAlias === 'xs' || media.mqAlias === 'sm') {
          this.isSmallDevice = true;
          this.openSideNav = false;
      } else {
          this.isSmallDevice = false;
          this.openSideNav = true;
      }
  });
  }

  hasChild = (_: number, node: NavItem) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.languages = [
      { id: 'en', display: 'English' },
      { id: 'ta', display: 'Tamil' }
    ]
  }

  changeLang(lang) {
    this.translate.use(lang.id)
  }

}
