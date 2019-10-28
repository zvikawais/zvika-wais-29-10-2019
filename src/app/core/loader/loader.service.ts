import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    private loaderStatus = new Subject<boolean>();
    showLoader$ = this.loaderStatus.asObservable();
    toggleLoader(value: boolean) {
        this.loaderStatus.next(value);
    }
}
