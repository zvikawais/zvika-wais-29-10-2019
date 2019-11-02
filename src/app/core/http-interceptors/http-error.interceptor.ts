import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OVER_50_CALLS_MSG } from 'src/app/shared/globals/globals';
import { AppErrorHandler } from '../error-handler/app-error-handler.service';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private errorHandler: AppErrorHandler) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap({
                error: (exception: any) => {
                    if (exception instanceof HttpErrorResponse) {
                        this.errorHandler.handleError(new Error(OVER_50_CALLS_MSG));
                    }
                }
            })
        );
    }
}
