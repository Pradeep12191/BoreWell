import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Output() toggleSidenav = new EventEmitter();
    languages;
    selectedLanguage;
    constructor(
        private translate: TranslateService,
    ) {
        this.languages = [
            { id: 'en', display: 'English' },
            { id: 'ta', display: 'தமிழ்' }
        ]
        this.selectedLanguage = this.languages[0];
    }
    changeLang(lang) {
        this.translate.use(lang.id);
        this.selectedLanguage = lang;
    }
}