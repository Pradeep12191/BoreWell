import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
    loader$ = new Subject<boolean>();

    showLoader() {
        this.loader$.next(true);
    }

    hideLoader() {
        this.loader$.next(false);
    }

    loaderObs() {
        return this.loader$.asObservable();
    }
}