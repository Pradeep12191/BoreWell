import { Subject } from 'rxjs';

export class CommonService {
    toggleSidenav$ = new Subject<any>();
    scrollTop$ = new Subject<any>();

    scrollTop(){
        this.scrollTop$.next();
    }

    scrollTopObs(){
        return this.scrollTop$.asObservable();
    }

    toggleSidenav() {
        this.toggleSidenav$.next();
    }

    toggleSidenavObs() {
        return this.toggleSidenav$.asObservable();
    }
}