import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoaderService } from '../loader/loader.service';
import { CachingService } from '../caching-service/caching.service';
import { mockData } from 'src/app/features/home/mocks/data.mock';

@Injectable({
    providedIn: 'root'
})

export class RestApiService {

    private readonly apiBaseUrl = environment.apiUrl;

    constructor(
        private httpClient: HttpClient,
        private cachingService: CachingService,
        private loaderService: LoaderService
    ) { }


    get<T>(endPoint: string, resourceName: string, params?: HttpParams, useDemo = false): Observable<T> {

        if (useDemo) {
            return of(mockData[resourceName]);
        }

        let url = `${this.apiBaseUrl}${endPoint}?apikey=${environment.apiKey}`;

        if (params) {
            url += '&' + params as any;
        }

        if (this.cachingService.isItemExists(resourceName, url)) {    // Only for preventing over 50 requests per day

            const cachedItem = this.cachingService.get<T>(resourceName, url);
            if (cachedItem) {
                return of(cachedItem);
            }
        }
        const request = this.httpClient.get<T>(url);
        return this.execute(request, resourceName, url);
    }


    execute<T>(rq: Observable<T>, resourceName: string, url: string): Observable<T> {
        this.loaderService.toggleLoader(true);
        return rq.pipe(
            finalize(() => this.loaderService.toggleLoader(false)),
            catchError((e) => {
                if (mockData[resourceName]) {
                    return this.get<T>(url, resourceName, null, true);
                }
                return throwError(e);
            }),
            tap((x) => {
                this.cachingService.set(resourceName, url, x);
            }));
    }
}
