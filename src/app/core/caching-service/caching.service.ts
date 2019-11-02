import { Injectable } from '@angular/core';
import { StorageResource } from 'src/app/shared/models/storage-item.model';

@Injectable({ providedIn: 'root' })
export class CachingService {

    isItemExists<T>(resourceName: string, itemKey: string): boolean {
        if (!localStorage[resourceName]) {
            return false;
        }
        const cachedData = JSON.parse(localStorage[resourceName]) as StorageResource<T>;
        return cachedData.Data.some((x) => x.Key === itemKey && x.ExpirationDate < new Date());
    }

    get<T>(resourceName: string, itemKey: string): T | null {
        const cachedData = JSON.parse(localStorage[resourceName]) as StorageResource<T>;
        const cachedItem = cachedData.Data.find((x) => x.Key === itemKey);
        return !!cachedItem ? cachedItem.Value : null;
    }

    set<T>(resourceName: string, itemKey: string, value: T) {
        if (!localStorage[resourceName]) {
            localStorage[resourceName] = JSON.stringify({ Data: [] } as StorageResource<T>);
        }

        const storageItem = JSON.parse(localStorage[resourceName]) as StorageResource<T>;
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + (1 * 60 * 60 * 1000)); // set expiration time for 1 hour
        storageItem.Data.push({ Key: itemKey, Value: value, ExpirationDate: expirationTime });
        localStorage[resourceName] = JSON.stringify(storageItem);
    }
}
