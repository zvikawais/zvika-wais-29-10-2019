
export interface Headline {
    EffectiveDate: Date;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: Date;
    EndEpochDate: number;
    MobileLink: string;
    Link: string;
}

export interface Minimum {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Maximum {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface ForecastTemperature {
    Minimum: Minimum;
    Maximum: Maximum;
}

export interface Day {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string;
}

export interface Night {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string;
}

export interface DailyForecast {
    Date: Date;
    EpochDate: number;
    Temperature: ForecastTemperature;
    Day: Day;
    Night: Night;
    Sources: string[];
    MobileLink: string;
    Link: string;
}

export interface NextDays {
    Headline: Headline;
    DailyForecasts: DailyForecast[];
}


