import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Output() toggleSidenav = new EventEmitter();
    languages;
    selectedLanguage;
    companyName = 'compnay name';
    userName = 'user name';
    userIntial = 'u';
    userRole = 'user role';
    routeSubscription: Subscription;
    constructor(
        private translate: TranslateService,
        private auth: AuthService,
        private route: ActivatedRoute,
    ) {
        this.languages = [
            { id: 'en', display: 'English' },
            { id: 'ta', display: 'தமிழ்' }
        ]
        this.selectedLanguage = this.languages[0];
    }

    ngOnInit() {
        this.translate.setDefaultLang('en')
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data && data.userInfo && data.userInfo.language) {
                this.translate.use(data.userInfo.language);
            }
            if (data && data.userInfo && data.userInfo.company) {
                this.companyName = data.userInfo.company;
            }
            if (data && data.userInfo && data.userInfo.name) {
                this.userName = data.userInfo.name;
                this.userIntial = data.userInfo.name.substring(0, 1).toUpperCase();
            }
            if (data && data.userInfo && data.userInfo.usertype) {
                this.userRole = data.userInfo.usertype;
            }
        })
    }

    ngOnDestroy() {

    }

    changeLang(lang) {
        this.translate.use(lang.id);
        this.selectedLanguage = lang;
    }

    logout() {
        this.auth.logOut()
    }
}