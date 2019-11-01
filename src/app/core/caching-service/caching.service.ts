import { Injectable } from '@angular/core';
import { StorageItem } from 'src/app/shared/models/storage-item.model';

@Injectable({ providedIn: 'root' })
export class CachingService {

    isResourceExists(resourceName: string): boolean {
        return localStorage[resourceName];
    }

    get<T>(resourceName: string, itemKey: string): T | null {
        const cachedData = JSON.parse(localStorage[resourceName]) as StorageItem<T>;
        const cachedItem = cachedData.Data.find((x) => x.Name === itemKey);
        return !!cachedItem ? cachedItem.Value : null;
    }

    set<T>(resourceName: string, itemKey: string, value: T) {
        if (!localStorage[resourceName]) {
            localStorage[resourceName] = JSON.stringify({ Data: [] } as StorageItem<T>);
        }
        const storageItem = JSON.parse(localStorage[resourceName]) as StorageItem<T>;
        storageItem.Data.push({ Name: itemKey, Value: value });
        localStorage[resourceName] = JSON.stringify(storageItem);
    }
}
