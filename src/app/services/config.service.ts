import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
interface url {
    name: string;
    url: string;
}

@Injectable()
export class ConfigService {
    private config;

    constructor(
        private http: HttpClient,
        // private auth: AuthService // error cyclic dependency
    ) {

    }

    get version() {
        return new Date().getTime();
    }

    public getConfig(key) {
        return this.config[key]
    }
    public load() {
        let url = 'assets/config/developement.json?t=' + this.version
        if (!isDevMode()) {
            url = 'assets/config/production.json?t=' + this.version
        }
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                this.config = response
            })
    }

    getUrl(name) {
        const urlObj = (this.config['urls'] as url[]).find(url => url.name === name)
        if (urlObj) {
            return urlObj.url;
        }
        return ''
    }

    getAbsoluteUrl(name) {
        const baseUrl = this.config['apiUrl'];
        return baseUrl + this.getUrl(name);
    }

    getAbsoluteUrlWithUser(name) {
        // return this.getAbsoluteUrl(name) + '/' + this.auth.username;
        return ''
    }
}