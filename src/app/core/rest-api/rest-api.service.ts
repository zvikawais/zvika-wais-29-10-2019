import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoaderService } from '../loader/loader.service';
import { StorageItem } from 'src/app/shared/models/storage-item.model';

@Injectable({
    providedIn: 'root'
})

export class RestApiService {

    private readonly apiBaseUrl = environment.apiUrl;

    constructor(
        private httpClient: HttpClient,
        private loaderService: LoaderService
    ) { }


    get<T>(endPoint: string, resourceKey: string, params?: HttpParams): Observable<T> {

        let url = `${this.apiBaseUrl}${endPoint}?apikey=${environment.apiKey}`;
        if (params) {
            url += '&' + params as any;
        }

        if (localStorage[resourceKey]) {    // Only for preventing over 50 requests per day
            const cachedData = JSON.parse(localStorage[resourceKey]) as StorageItem<T>;
            const cachedItem = cachedData.Data.find(x => x.Name === url);
            if (cachedItem) {
                return of(cachedItem.Value);
            }
        }
        const request = this.httpClient.get<T>(url, { responseType: 'json' });
        return this.execute(request, resourceKey, url);
    }

    // post<T>(endPoint: string, body: object = {}): Observable<T> {
    //     const request = this.httpClient.post<T>(
    //         `${this.apiBaseUrl}${endPoint}`,
    //         JSON.stringify(body),
    //     );
    //     return this.execute(request);
    // }

    execute<T>(rq: Observable<T>, resourceKey: string, url: string): Observable<T> {
        this.loaderService.toggleLoader(true);
        return rq.pipe(
            finalize(() => this.loaderService.toggleLoader(false)),
            tap(x => {
                if (!localStorage[resourceKey]) {
                    localStorage[resourceKey] = JSON.stringify({ Data: [] } as StorageItem<T>);
                }
                const storageItem = JSON.parse(localStorage[resourceKey]) as StorageItem<T>;
                storageItem.Data.push({ Name: url, Value: x });
                localStorage[resourceKey] = JSON.stringify(storageItem);
            }));
    }
}
