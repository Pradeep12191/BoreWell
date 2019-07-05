import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}