import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { ToastrService } from 'ngx-toastr';

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
    langUrl;
    constructor(
        private translate: TranslateService,
        private auth: AuthService,
        private route: ActivatedRoute,
        public common: CommonService,
        private http: HttpClient,
        private config: ConfigService,
        private toastr: ToastrService
    ) {
        this.languages = [
            { id: 'en', display: 'English' },
            { id: 'ta', display: 'தமிழ்' }
        ]
        // this.selectedLanguage = this.languages[0];
        const apiUrl = this.config.getConfig('apiUrl');
        const url = this.config.getUrl('updateLang');
        this.langUrl = apiUrl + url;
    }

    ngOnInit() {
        this.translate.setDefaultLang('en')
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data && data.userInfo && data.userInfo.language) {
                this.selectedLanguage = this.languages.find((lang) => lang.id === data.userInfo.language)
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
        if (this.routeSubscription) { this.routeSubscription.unsubscribe() }
    }

    changeLang(lang) {
        if (this.selectedLanguage.id === lang.id) {
            return
        }
        this.http.put(this.langUrl, { language: lang.id }).subscribe(() => {
            this.translate.use(lang.id);
            this.selectedLanguage = lang;
            this.toastr.success('Language changed successfully', null, { timeOut: 1000 })
        }, (err: HttpErrorResponse) => {
            if (err) {
                this.toastr.error('Unable to update language')
            }
        })
    }

    logout() {
        this.auth.logOut()
    }
}