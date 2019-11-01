import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from 'src/app/shared/models/favorite.model';
import { FavoritesService } from '../services/favorites.service';
import { UnitType, CELSIUS, FAHRENHEIT } from 'src/app/shared/globals/globals';
import { HomeService } from '../../home/services/home.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {

  favorites$: Observable<Favorite[]>;
  selectedUnitType$: Observable<UnitType>;

  constructor(
    private favoritesService: FavoritesService,
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.favorites$ = this.favoritesService.favoriteSource$;
    this.selectedUnitType$ = this.homeService.unitTypeSource$;
    this.favoritesService.fetchFavorites();
  }

  getTemperatureText(favorite: Favorite, unitType: UnitType) {
    return unitType === UnitType.celsius ?
      favorite.Temperature.Metric.Value + CELSIUS :
      favorite.Temperature.Imperial.Value + FAHRENHEIT;
  }
}
