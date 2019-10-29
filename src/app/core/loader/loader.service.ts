import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    private loaderStatus = new BehaviorSubject<boolean>(false);
    showLoader$ = this.loaderStatus.asObservable();
    toggleLoader(value: boolean) {
        this.loaderStatus.next(value);
    }
}
