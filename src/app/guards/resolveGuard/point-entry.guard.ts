import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, timer, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export class PointEntryResolve implements Resolve<any>{
    constructor() {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return timer(1500).pipe(switchMap(() => of({ data: 'value' })))
    }
}