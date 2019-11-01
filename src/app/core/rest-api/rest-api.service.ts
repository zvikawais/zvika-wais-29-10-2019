import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoaderService } from '../loader/loader.service';
import { CachingService } from '../caching-service/caching.service';

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


    get<T>(endPoint: string, resourceName: string, params?: HttpParams): Observable<T> {

        let url = `${this.apiBaseUrl}${endPoint}?apikey=${environment.apiKey}`;

        if (params) {
            url += '&' + params as any;
        }

        if (this.cachingService.isResourceExists(resourceName)) {    // Only for preventing over 50 requests per day

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
            tap((x) => {
                this.cachingService.set(resourceName, url, x)
            }));
    }
}
