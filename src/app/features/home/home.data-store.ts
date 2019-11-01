import { CityResponse } from 'src/app/shared/models/city-response.model';
import { WeatherCondition } from 'src/app/shared/models/weather-condition.model';
import { LocationResponse } from 'src/app/shared/models/location-response.model';
import { NextDays } from 'src/app/shared/models/next-days.model';
import { GeoPositionResponse } from 'src/app/shared/models/geo-position-response.model';
import { UnitType } from 'src/app/shared/globals/globals';

export interface HomeDataStore {
    citiesSource: CityResponse[];
    currentWeatherSource: WeatherCondition;
    selectedLocationSource: LocationResponse;
    nextDaysSource: NextDays;
    geoPositionSource: GeoPositionResponse;
    unitTypeSource: UnitType;
}
