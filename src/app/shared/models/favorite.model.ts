import { Temperature } from './weather-condition.model';

export interface Favorite {
    LocationKey: string;
    Name: string;
    CurrentWeather: string;
    Temperature: Temperature;
}
