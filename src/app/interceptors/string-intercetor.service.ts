import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class StringInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let modifiedReq = req.clone();
        if (req.body) {
            // for (const key in req.body) {
            //     if (req.body.hasOwnProperty(key)) {
            //         const value = req.body[key];
            //         if (value && typeof value === 'string') {

            //         } else if (value !== null || value !== undefined) {
            //             req.body[key] = req.body[key].toString();
            //         }
            //     }
            // }

            this.convertToString(req.body);
            modifiedReq = req.clone({
                body: req.body
            });
        }



        return next.handle(modifiedReq);
    }

    convertToString(obj) {
        if(typeof obj !== 'object'){
            return;
        }
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (value || value === 0) {
                    if (typeof value === 'object') {
                        this.convertToString(value);
                    }
                    if (typeof value !== 'string') {
                        obj[key] = obj[key].toString();
                    }
                }

            }
        }
    }
}