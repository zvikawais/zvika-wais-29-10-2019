import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { TEL_AVIV_KEY, UnitType, CELSIUS, FAHRENHEIT } from 'src/app/shared/globals/globals';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  searchTextChanged$ = new Subject<string>();
  cities$: Observable<CityResponse[]>;
  currentWeather$: Observable<WeatherCondition>;
  selectedLocation$: Observable<LocationResponse>;
  nextDays$: Observable<NextDays>;
  unitTypeEnum = UnitType;
  selectedUnitType$: Observable<UnitType>;

  protected onDestroy$ = new Subject<void>();

  constructor(
    private homeService: HomeService,
    private favoritesService: FavoritesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl(null, [Validators.pattern('^[a-zA-Z]+$')]),
    });
    this.cities$ = this.homeService.citiesSource$;
    this.selectedLocation$ = this.homeService.selectedLocationSource$;
    this.currentWeather$ = this.homeService.currentWeatherSource$;
    this.nextDays$ = this.homeService.nextDaysSource$;
    this.selectedUnitType$ = this.homeService.unitTypeSource$;
    this.registerTypingEvent(this.searchForm.controls.searchQuery.valueChanges);
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.citySelectionChanged(this.activatedRoute.snapshot.paramMap.get('id'));
    }
    this.locateUser();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  toggleUnitType(unitType: UnitType) {
    this.homeService.toggleUnitType(unitType);
  }

  citySelectionChanged(locationKey: string) {
    this.homeService.fetchCurrentWeather(locationKey);
    this.homeService.fetchNextDays(locationKey);
  }

  getTemperatureText(currentWeather: WeatherCondition, unitType: UnitType): string {
    return unitType === UnitType.celsius ?
      currentWeather.Temperature.Metric.Value + CELSIUS :
      currentWeather.Temperature.Imperial.Value + FAHRENHEIT;
  }

  getRangeTemperatureText(forecastTemperature: ForecastTemperature, unitType: UnitType) {
    const temperature = forecastTemperature.Minimum.Value + ' - '
      + forecastTemperature.Maximum.Value;
    return unitType === UnitType.celsius ? temperature + CELSIUS : temperature + FAHRENHEIT;
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
    } as Favorite);
  }

  private registerTypingEvent(valueChanges: Observable<string>) {
    valueChanges.pipe(
      filter((search) => !!search),
      takeUntil(this.onDestroy$),
      debounceTime(200),
      tap((q) => {
        if (this.searchForm.valid && (q + '').trim()) {
          this.homeService.fetchCities(q);
        }
      }),
    ).subscribe();
  }

  private locateUser() {
    if (!navigator.geolocation) {
      this.citySelectionChanged(TEL_AVIV_KEY);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.homeService.getGeoposition(latitude + '', longitude + '');
      }, () => {
        this.citySelectionChanged(TEL_AVIV_KEY);
      });
    }
  }
}
