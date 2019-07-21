import { Subject } from 'rxjs';

export class CommonService {
    toggleSidenav$ = new Subject<any>();

    toggleSidenav() {
        this.toggleSidenav$.next();
    }

    toggleSidenavObs() {
        return this.toggleSidenav$.asObservable();
    }
}