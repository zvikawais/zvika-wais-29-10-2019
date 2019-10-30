import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Favorite } from 'src/app/shared/models/favorite.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    constructor() { }

    public get favorites(): Favorite[] {
        return localStorage.favorites ? JSON.parse(localStorage.favorites) : [];
    }
    public set favorites(v: Favorite[]) {
        localStorage.favorites = JSON.stringify(v);
        this.favoriteSource.next(this.favorites);

    }

    private favoriteSource = new BehaviorSubject<Favorite[]>([]);

    favoriteSource$ = this.favoriteSource.asObservable();


    fetchFavorites() {
        this.favoriteSource.next(this.favorites);
    }

    isFavorite(favoriteId: string): boolean {
        const favorite = this.favorites.find((x) => x.LocationKey === favoriteId);
        return !!favorite;
    }

    addRemoveFavorite(favorite: Favorite) {
        if (this.isFavorite(favorite.LocationKey)) {
            this.removeFavorite(favorite.LocationKey);
        } else {
            this.addFavorite(favorite);
        }
    }

    private addFavorite(favorite: Favorite) {
        if (!this.favorites.find((x) => x.LocationKey === favorite.LocationKey)) {
            const currentFavorites = this.favorites;
            currentFavorites.push(favorite);
            this.favorites = currentFavorites;
        }
    }

    private removeFavorite(favoriteId: string) {
        const favoriteIndex = this.favorites.findIndex((x) => x.LocationKey === favoriteId);
        if (favoriteIndex > -1) {
            const currentFavorites = this.favorites;
            currentFavorites.splice(favoriteIndex, 1);
            this.favorites = currentFavorites;
        }
    }
}
