import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';;
import { HomeService } from '../services/home.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { filter, takeUntil, debounceTime, tap } from 'rxjs/operators';
import { CityResponse } from 'src/app/shared/models/city-response.model';
import { WeatherCondition } from 'src/app/shared/models/weather-condition.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  searchFormCtl = new FormControl();
  searchTextChanged$ = new Subject<string>();
  searchInputSubscription$: Subscription;
  cities$: Observable<CityResponse[]>;
  currentWeather$: Observable<WeatherCondition>;

  protected onDestroy$ = new Subject<void>();

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.cities$ = this.homeService.citiesSource$;
    this.currentWeather$ = this.homeService.currentWeatherSource$;
    this.registerEvents(this.searchFormCtl.valueChanges);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  citySelectionChanged(locationId: string) {
    this.homeService.fetchCurrentWeather(locationId);
  }


  private registerEvents(valueChanges: Observable<string>) {
    valueChanges.pipe(
      filter(search => !!search),
      takeUntil(this.onDestroy$),
      debounceTime(3000),
      tap(q => {
        this.homeService.fetchCities(q);
      }),
    ).subscribe();
  }

}
