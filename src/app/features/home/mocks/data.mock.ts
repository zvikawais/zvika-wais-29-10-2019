
export const mockData = {
    currentWeather: [
        {
            LocalObservationDateTime: "2019-11-03T00:10:00+02:00",
            EpochTime: 1572732600,
            WeatherText: "Clear",
            WeatherIcon: 33,
            HasPrecipitation: false,
            PrecipitationType: null,
            IsDayTime: false,
            Temperature: {
                Metric: {
                    Value: 20.1,
                    Unit: "C",
                    UnitType: 17
                },
                Imperial: {
                    Value: 68,
                    Unit: "F",
                    UnitType: 18
                }
            },
            MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
            Link: "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
        }
    ],
    forecasts: {
        Headline: {
            EffectiveDate: "2019-11-03T07:00:00+02:00",
            EffectiveEpochDate: 1572757200,
            Severity: 4,
            Text: "Pleasant Sunday",
            Category: "",
            EndDate: null,
            EndEpochDate: null,
            MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us",
            Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
        },
        DailyForecasts: [
            {
                Date: "2019-11-02T07:00:00+02:00",
                EpochDate: 1572670800,
                Temperature: {
                    Minimum: {
                        Value: 64,
                        Unit: "F",
                        UnitType: 18
                    },
                    Maximum: {
                        Value: 78,
                        Unit: "F",
                        UnitType: 18
                    }
                },
                Day: {
                    Icon: 3,
                    IconPhrase: "Partly sunny",
                    HasPrecipitation: false
                },
                Night: {
                    Icon: 33,
                    IconPhrase: "Clear",
                    HasPrecipitation: false
                },
                Sources: [
                    "AccuWeather"
                ],
                MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
                Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
            },
            {
                Date: "2019-11-03T07:00:00+02:00",
                EpochDate: 1572757200,
                Temperature: {
                    Minimum: {
                        Value: 62,
                        Unit: "F",
                        UnitType: 18
                    },
                    Maximum: {
                        Value: 80,
                        Unit: "F",
                        UnitType: 18
                    }
                },
                Day: {
                    Icon: 1,
                    IconPhrase: "Sunny",
                    HasPrecipitation: false
                },
                Night: {
                    Icon: 33,
                    IconPhrase: "Clear",
                    HasPrecipitation: false
                },
                Sources: [
                    "AccuWeather"
                ],
                MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
                Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
            },
            {
                Date: "2019-11-04T07:00:00+02:00",
                EpochDate: 1572843600,
                Temperature: {
                    Minimum: {
                        Value: 64,
                        Unit: "F",
                        UnitType: 18
                    },
                    Maximum: {
                        Value: 82,
                        Unit: "F",
                        UnitType: 18
                    }
                },
                Day: {
                    Icon: 1,
                    IconPhrase: "Sunny",
                    HasPrecipitation: false
                },
                Night: {
                    Icon: 33,
                    IconPhrase: "Clear",
                    HasPrecipitation: false
                },
                Sources: [
                    "AccuWeather"
                ],
                MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
                Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
            },
            {
                Date: "2019-11-05T07:00:00+02:00",
                EpochDate: 1572930000,
                Temperature: {
                    Minimum: {
                        Value: 64,
                        Unit: "F",
                        UnitType: 18
                    },
                    Maximum: {
                        Value: 84,
                        Unit: "F",
                        UnitType: 18
                    }
                },
                Day: {
                    Icon: 1,
                    IconPhrase: "Sunny",
                    HasPrecipitation: false
                },
                Night: {
                    Icon: 33,
                    IconPhrase: "Clear",
                    HasPrecipitation: false
                },
                Sources: [
                    "AccuWeather"
                ],
                MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
                Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
            },
            {
                Date: "2019-11-06T07:00:00+02:00",
                EpochDate: 1573016400,
                Temperature: {
                    Minimum: {
                        Value: 67,
                        Unit: "F",
                        UnitType: 18
                    },
                    Maximum: {
                        Value: 83,
                        Unit: "F",
                        UnitType: 18
                    }
                },
                Day: {
                    Icon: 1,
                    IconPhrase: "Sunny",
                    HasPrecipitation: false
                },
                Night: {
                    Icon: 33,
                    IconPhrase: "Clear",
                    HasPrecipitation: false
                },
                Sources: [
                    "AccuWeather"
                ],
                MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
                Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
            }
        ]
    },
    locations: {
        Version: 1,
        Key: "215854",
        Type: "City",
        Rank: 31,
        LocalizedName: "Tel Aviv",
        EnglishName: "Tel Aviv",
        PrimaryPostalCode: "",
        Region: {
            ID: "MEA",
            LocalizedName: "Middle East",
            EnglishName: "Middle East"
        },
        Country: {
            ID: "IL",
            LocalizedName: "Israel",
            EnglishName: "Israel"
        },
        AdministrativeArea: {
            ID: "TA",
            LocalizedName: "Tel Aviv",
            EnglishName: "Tel Aviv",
            Level: 1,
            LocalizedType: "District",
            EnglishType: "District",
            CountryID: "IL"
        },
        TimeZone: {
            Code: "IST",
            Name: "Asia/Jerusalem",
            GmtOffset: 2,
            IsDaylightSaving: false,
            NextOffsetChange: "2020-03-27T00:00:00Z"
        },
        GeoPosition: {
            Latitude: 32.045,
            Longitude: 34.77,
            Elevation: {
                Metric: {
                    Value: 34,
                    Unit: "m",
                    UnitType: 5
                },
                Imperial: {
                    Value: 111,
                    Unit: "ft",
                    UnitType: 0
                }
            }
        },
        IsAlias: false,
        SupplementalAdminAreas: [],
        DataSets: [
            "Alerts"
        ]
    }
};



