import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
    loader$ = new Subject<boolean>();
    saveLoader$ = new Subject<boolean>();

    showLoader() {
        this.loader$.next(true);
    }

    hideLoader() {
        this.loader$.next(false);
    }

    showSaveLoader() {
        this.saveLoader$.next(true);
    }

    hideSaveLoader() {
        this.saveLoader$.next(false);
    }

    loaderObs() {
        return this.loader$.asObservable();
    }

    saveLoaderObs(){
        return this.saveLoader$.asObservable();
    }
}