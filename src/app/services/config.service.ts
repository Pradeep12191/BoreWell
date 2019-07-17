import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface url{
    name: string;
    url: string;
}

@Injectable()
export class ConfigService {
    private config;

    constructor(
        private http: HttpClient
    ){

    }

    public getConfig(key) {
        return this.config[key]
    }
    public load() {
       return this.http.get('assets/config/developement.json')
            .toPromise()
            .then((response) => {
                this.config = response
            })
    }

    getUrl(name){
        return (this.config['urls'] as url[]).find(url => url.name === name).url;
    }
}