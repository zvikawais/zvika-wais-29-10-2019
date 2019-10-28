import { Injectable } from '@angular/core';
import { RestApiService } from 'src/app/core/rest-api/rest-api.service';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CityResponse } from 'src/app/shared/models/city-response.model';
import { WeatherCondition } from 'src/app/shared/models/weather-condition.model';


@Injectable()
export class HomeService {
    constructor(private restApi: RestApiService) {

    }

    private endPoints = {
        cities: 'locations/v1/cities/autocomplete',
        currentConditions: 'currentconditions/v1/'
    };


    private citiesSource = new Subject<CityResponse[]>();
    private currentWeatherSource = new Subject<WeatherCondition>();

    citiesSource$ = this.citiesSource.asObservable();
    currentWeatherSource$ = this.currentWeatherSource.asObservable();

    fetchCities(q: string) {
        this.restApi.get<CityResponse[]>(this.endPoints.cities, 'cities', new HttpParams({ fromObject: { q } }))
            .pipe(tap((x) => this.citiesSource.next(x)))
            .subscribe();
    }

    fetchCurrentWeather(locationId: string) {
        this.restApi.get<WeatherCondition>(this.endPoints.currentConditions + locationId, 'currentWeather')
            .pipe(tap((x) => this.currentWeatherSource.next(x)))
            .subscribe();
    }
}
