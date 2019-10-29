import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, debounceTime, tap } from 'rxjs/operators';
import { CityResponse } from 'src/app/shared/models/city-response.model';
import { WeatherCondition } from 'src/app/shared/models/weather-condition.model';
import { NextDays, ForecastTemperature } from 'src/app/shared/models/next-days.model';
import { FavoritesService } from '../../favorites/services/favorites.service';
import { Favorite } from 'src/app/shared/models/favorite.model';
import { ActivatedRoute } from '@angular/router';
import { LocationResponse } from 'src/app/shared/models/location-response.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  searchFormCtl = new FormControl();
  searchTextChanged$ = new Subject<string>();
  cities$: Observable<CityResponse[]>;
  currentWeather$: Observable<WeatherCondition>;
  selectedLocation$: Observable<LocationResponse>;
  nextDays$: Observable<NextDays>;
  selectedUnitType: 'fahrenheit' | 'celsius' = 'celsius';

  protected onDestroy$ = new Subject<void>();

  private get unitSymbole(): string {
    return this.selectedUnitType === 'celsius' ? ' &#x2103;' : ' &#8457;';
  }

  constructor(
    private homeService: HomeService,
    private favoritesService: FavoritesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.cities$ = this.homeService.citiesSource$;
    this.selectedLocation$ = this.homeService.selectedLocationSource$;
    this.currentWeather$ = this.homeService.currentWeatherSource$;
    this.nextDays$ = this.homeService.nextDaysSource$;
    this.registerEvents(this.searchFormCtl.valueChanges);
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.citySelectionChanged(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  toggleUnitType() {
    this.selectedUnitType = this.selectedUnitType === 'celsius' ? 'fahrenheit' : 'celsius';
  }

  citySelectionChanged(locationKey: string) {
    this.homeService.fetchCurrentWeather(locationKey);
    this.homeService.fetchNextDays(locationKey);
  }

  getTemperatureText(currentWeather: WeatherCondition): string {
    return this.selectedUnitType === 'celsius' ?
      currentWeather.Temperature.Metric.Value + this.unitSymbole :
      currentWeather.Temperature.Imperial.Value + this.unitSymbole;
  }

  getRangeTemperatureText(forecastTemperature: ForecastTemperature) {
    return forecastTemperature.Minimum.Value + this.unitSymbole + ' - '
      + forecastTemperature.Maximum.Value + this.unitSymbole;
  }

  getFavoriteBtnToolTip(locationKey: string) {
    return this.favoritesService.isFavorite(locationKey) ?
      'Remove from your favorites' :
      'Add to your favorites';
  }

  getDayText(i: number) {
    const today = new Date();
    const forecastDay = new Date();
    forecastDay.setDate(today.getDate() + i);
    return forecastDay.toString().split(' ')[0];
  }

  isFavorite(locationKey: string) {
    return this.favoritesService.isFavorite(locationKey);
  }

  addRemoveFavorite(currentWeather: WeatherCondition, selectedCity: CityResponse) {
    this.favoritesService.addRemoveFavorite({
      CurrentWeather: currentWeather.WeatherText,
      LocationKey: selectedCity.Key,
      Name: selectedCity.LocalizedName,
      Temperature: currentWeather.Temperature,
      SelectedUnitType: this.selectedUnitType
    } as Favorite);
  }

  private registerEvents(valueChanges: Observable<string>) {
    valueChanges.pipe(
      filter((search) => !!search),
      takeUntil(this.onDestroy$),
      debounceTime(1000),
      tap((q) => {
        this.homeService.fetchCities(q);
      }),
    ).subscribe();
  }

}
