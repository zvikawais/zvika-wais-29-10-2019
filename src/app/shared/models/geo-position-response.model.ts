export interface GeoPositionResponse {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    EnglishName: string;
    PrimaryPostalCode: string;
    Region: Country;
    Country: Country;
    AdministrativeArea: AdministrativeArea;
    TimeZone: TimeZone;
    GeoPosition: GeoPosition;
    IsAlias: boolean;
    ParentCity: ParentCity;
    SupplementalAdminAreas: any[];
    DataSets: string[];
}

export interface AdministrativeArea {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
    Level: number;
    LocalizedType: string;
    EnglishType: string;
    CountryID: string;
}

export interface Country {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
}

export interface GeoPosition {
    Latitude: number;
    Longitude: number;
    Elevation: Elevation;
}

export interface Elevation {
    Metric: Imperial;
    Imperial: Imperial;
}

export interface Imperial {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface ParentCity {
    Key: string;
    LocalizedName: string;
    EnglishName: string;
}

export interface TimeZone {
    Code: string;
    Name: string;
    GmtOffset: number;
    IsDaylightSaving: boolean;
    NextOffsetChange: Date;
}
