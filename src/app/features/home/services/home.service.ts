import { Injectable } from '@angular/core';
import { RestApiService } from 'src/app/core/rest-api/rest-api.service';
import { BehaviorSubject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CityResponse } from 'src/app/shared/models/city-response.model';
import { WeatherCondition } from 'src/app/shared/models/weather-condition.model';
import { NextDays } from 'src/app/shared/models/next-days.model';
import { LocationResponse } from 'src/app/shared/models/location-response.model';


@Injectable({ providedIn: 'root' })
export class HomeService {
    constructor(private restApi: RestApiService) {
    }
    private readonly endPoints = {
        cities: 'locations/v1/cities/autocomplete',
        location: 'locations/v1/',
        currentConditions: 'currentconditions/v1/',
        forecasts: 'forecasts/v1/daily/5day/'
    };

    private citiesSource = new BehaviorSubject<CityResponse[]>([]);
    private currentWeatherSource = new BehaviorSubject<WeatherCondition>(null);
    private selectedLocationSource = new BehaviorSubject<LocationResponse>(null);
    private nextDaysSource = new BehaviorSubject<NextDays>(null);

    citiesSource$ = this.citiesSource.asObservable();
    nextDaysSource$ = this.nextDaysSource.asObservable();
    currentWeatherSource$ = this.currentWeatherSource.asObservable();
    selectedLocationSource$ = this.selectedLocationSource.asObservable();

    fetchCities(q: string) {
        this.restApi.get<CityResponse[]>(this.endPoints.cities, 'cities', new HttpParams({ fromObject: { q } }))
            .pipe(tap((x) => this.citiesSource.next(x)))
            .subscribe();
    }

    fetchCurrentWeather(locationId: string) {
        this.setSelectedLocation(locationId);
        this.restApi.get<WeatherCondition[]>(this.endPoints.currentConditions + locationId, 'currentWeather')
            .pipe(tap((x) => this.currentWeatherSource.next(x[0])))
            .subscribe();
    }

    fetchNextDays(locationId: string) {
        this.restApi.get<NextDays>(this.endPoints.forecasts + locationId, 'forecasts')
            .pipe(tap((x) => this.nextDaysSource.next(x)))
            .subscribe();
    }

    private setSelectedLocation(locationId: string) {
        this.restApi.get<LocationResponse>(this.endPoints.location + locationId, 'locations')
            .pipe(tap((x) => this.selectedLocationSource.next(x)))
            .subscribe();
    }
}
