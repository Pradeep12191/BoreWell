import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { SIDE_NAV_ITEMS } from '../data'
import { NestedTreeControl } from '@angular/cdk/tree';
import { NavItem } from '../models';
import { MatTreeNestedDataSource, MatSidenav } from '@angular/material';
import { MediaObserver } from '@angular/flex-layout';
import { LoaderService } from '../services/loader-service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { FADE_IN_ANIMATION, ROTATE_PLUS_ANIMATION, EXPAND } from '../animations';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-post-login',
  templateUrl: './post-login.component.html',
  styleUrls: ['./post-login.component.scss'],
  animations: [FADE_IN_ANIMATION, ROTATE_PLUS_ANIMATION, EXPAND]
})
export class PostLoginComponent implements OnInit, OnDestroy {

  title = 'bore-well-app';
  openSideNav = true;
  isSmallDevice;
  sideNavItems = SIDE_NAV_ITEMS;
  loading;
  loaderSubscription: Subscription;

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  treeControl = new NestedTreeControl<NavItem>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavItem>();
  isMobileSideNav = true;
  activeMainNode;
  activeSubNode;

  get isMobile(){
    return this.mediaObserver.isActive('lt-md') && this.isMobileSideNav
  }

  constructor(
    private mediaObserver: MediaObserver,
    private loader: LoaderService,
    private router: Router,
    private config: ConfigService
  ) {
    this.isMobileSideNav = this.config.getConfig('mobileNav');
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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loader.showLoader()
      }
      if (event instanceof NavigationEnd) {
        this.loader.hideLoader();
      }
    });
    this.loaderSubscription = this.loader.loader$.subscribe((status) => {
      this.loading = status
    })
  }

  ngOnDestroy() {
    if (this.loaderSubscription) { this.loaderSubscription.unsubscribe(); }
  }

  closeSidenavOnMobile() {
    if (this.mediaObserver.isActive('lt-md')) {
      this.sidenav.close()
    }
  }

  showLoader() {
    this.loader.showLoader();
  }

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
