import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface url {
    name: string;
    url: string;
}

@Injectable()
export class ConfigService {
    private config;

    constructor(
        private http: HttpClient
    ) {

    }

    public getConfig(key) {
        return this.config[key]
    }
    public load() {
        let url = 'assets/config/developement.json'
        if (!isDevMode()) {
            url = 'assets/config/production.json'
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
}