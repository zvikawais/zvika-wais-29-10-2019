import { Injectable } from '@angular/core';
import { RestApiService } from 'src/app/core/rest-api/rest-api.service';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { CityResponse } from 'src/app/shared/models/city-response.model';
import { WeatherCondition } from 'src/app/shared/models/weather-condition.model';
import { NextDays } from 'src/app/shared/models/next-days.model';
import { LocationResponse } from 'src/app/shared/models/location-response.model';
import { GeoPositionResponse } from 'src/app/shared/models/geo-position-response.model';
import { UnitType } from 'src/app/shared/globals/globals';
import { HttpParams } from '@angular/common/http';
import { HomeDataStore } from '../home.data-store';


@Injectable({ providedIn: 'root' })
export class HomeService {
    constructor(private restApi: RestApiService) {
    }
    private readonly endPoints = {
        cities: 'locations/v1/cities/autocomplete',
        location: 'locations/v1/',
        currentConditions: 'currentconditions/v1/',
        forecasts: 'forecasts/v1/daily/5day/',
        geoposition: 'locations/v1/cities/geoposition/search'
    };

    private citiesSource = new BehaviorSubject<CityResponse[]>([]);
    private currentWeatherSource = new BehaviorSubject<WeatherCondition>(null);
    private selectedLocationSource = new BehaviorSubject<LocationResponse>(null);
    private nextDaysSource = new BehaviorSubject<NextDays>(null);
    private geoPositionSource = new BehaviorSubject<GeoPositionResponse>(null);
    private unitTypeSource = new BehaviorSubject<UnitType>(UnitType.fahrenheit);

    private dataStore: HomeDataStore = {
        citiesSource: [],
        currentWeatherSource: {} as WeatherCondition,
        selectedLocationSource: {} as LocationResponse,
        nextDaysSource: {} as NextDays,
        geoPositionSource: {} as GeoPositionResponse,
        unitTypeSource: {} as UnitType
    };

    readonly citiesSource$ = this.citiesSource.asObservable();
    readonly nextDaysSource$ = this.nextDaysSource.asObservable();
    readonly currentWeatherSource$ = this.currentWeatherSource.asObservable();
    readonly selectedLocationSource$ = this.selectedLocationSource.asObservable();
    readonly geoPositionSource$ = this.geoPositionSource.asObservable();
    readonly unitTypeSource$ = this.unitTypeSource.asObservable();

    fetchCities(q: string) {
        this.restApi.get<CityResponse[]>(this.endPoints.cities, 'cities', new HttpParams({ fromObject: { q } }))
            .pipe(map((x) => {
                this.dataStore.citiesSource = x;
                this.citiesSource.next([...this.dataStore.citiesSource]);
            }))
            .subscribe();
    }

    fetchCurrentWeather(locationId: string) {
        this.setSelectedLocation(locationId);
        this.restApi.get<WeatherCondition[]>(this.endPoints.currentConditions + locationId, 'currentWeather')
            .pipe(map((x) => {
                this.dataStore.currentWeatherSource = x[0];
                this.currentWeatherSource.next({ ...this.dataStore.currentWeatherSource });
                this.fetchNextDays(locationId, this.unitTypeSource.value === UnitType.celsius);
            }))
            .subscribe();
    }

    getGeoposition(lat: string, lon: string) {
        this.restApi.get<GeoPositionResponse>(this.endPoints.geoposition, 'geoposition',
            new HttpParams({ fromObject: { q: lat + ',' + lon } }))
            .pipe(map((x) => {
                this.dataStore.geoPositionSource = x;
                this.geoPositionSource.next({ ...this.dataStore.geoPositionSource });
                this.fetchCurrentWeather(x.Key);
            }))
            .subscribe();
    }

    toggleUnitType() {
        const lastUnitType = this.unitTypeSource.value;
        this.unitTypeSource.next(lastUnitType === UnitType.celsius ? UnitType.fahrenheit : UnitType.celsius);
        this.fetchNextDays(this.selectedLocationSource.value.Key, lastUnitType !== UnitType.celsius);
    }


    private fetchNextDays(locationId: string, withCelsiusUnit: boolean) {
        let httpParams: HttpParams;
        if (withCelsiusUnit) {
            httpParams = new HttpParams({ fromObject: { metric: "true" } });
        }
        this.restApi.get<NextDays>(this.endPoints.forecasts + locationId, 'forecasts', httpParams)
            .pipe(map((x) => {
                this.dataStore.nextDaysSource = x;
                this.nextDaysSource.next({ ...this.dataStore.nextDaysSource });
            }))
            .subscribe();
    }


    private setSelectedLocation(locationId: string) {
        this.restApi.get<LocationResponse>(this.endPoints.location + locationId, 'locations')
            .pipe(map((x) => {
                this.dataStore.selectedLocationSource = x;
                this.selectedLocationSource.next({ ...this.dataStore.selectedLocationSource });
            }))
            .subscribe();
    }
}
