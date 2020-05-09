import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
    loader$ = new Subject<boolean>();
    saveLoader$ = new Subject<{ status: boolean, message?: string }>();

    showLoader() {
        this.loader$.next(true);
    }

    hideLoader() {
        this.loader$.next(false);
    }

    showSaveLoader(message = '') {
        this.saveLoader$.next({ status: true, message });
    }

    hideSaveLoader() {
        this.saveLoader$.next({ status: false });
    }

    loaderObs() {
        return this.loader$.asObservable();
    }

    saveLoaderObs() {
        return this.saveLoader$.asObservable();
    }
}