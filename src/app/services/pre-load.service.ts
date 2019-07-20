import { PreloadingStrategy, Route } from '@angular/router';
import { of } from 'rxjs';

export class CustomPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: Function) {
        if(route.data && route.data.preload){
            return load()
        }
        return of(null)
    }
}