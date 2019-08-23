import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, delay } from 'rxjs/operators';
import { LoaderService } from '../services/loader-service';
import { timer } from 'rxjs';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
    constructor(private loader: LoaderService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.method === 'POST') {
            this.loader.showSaveLoader()
        }
        return next.handle(req).pipe(
            tap((res) => {
                if (res instanceof HttpResponse) {
                    if (req.method === 'POST') {
                        this.loader.hideSaveLoader()
                    }
                }

                if (res instanceof HttpErrorResponse) {
                    if (req.method === 'POST') {
                        this.loader.hideSaveLoader();
                    }
                }

            }),

        )
    }
}