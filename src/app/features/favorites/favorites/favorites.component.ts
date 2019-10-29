import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from 'src/app/shared/models/favorite.model';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites$: Observable<Favorite[]>;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.favorites$ = this.favoritesService.favoriteSource$;
    this.favoritesService.fetchFavorites();
  }

  getTemperatureText(favorite: Favorite): string {
    return favorite.SelectedUnitType === 'celsius' ?
      favorite.Temperature.Metric.Value + ' &#x2103;' :
      favorite.Temperature.Imperial.Value + ' &#8457;';
  }
}
