import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap({
                error: (exception: any) => {
                    let message = '';
                    if (exception.error instanceof ErrorEvent) {
                        // client-side error
                        message = `Error: ${exception.error.message}`;
                    } else {
                        // server-side error
                        message = `Error Code: ${exception.status}\nMessage: ${exception.message}`;
                    }
                    const appErrorHandler = this.injector.get(ErrorHandler);
                    appErrorHandler.handleError({ message } as Error);
                }
            })
        );
    }
}
