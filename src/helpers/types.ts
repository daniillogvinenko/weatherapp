export interface IAppState {
    weatherState: IWeatherState,
    isLoading: boolean,
    inputValue: string,
    hourlyForecast: IHourlyForecast[],

    isError: boolean,
    errorMessage: string,
}

export interface IWeatherState {
    weatherDegrees: number,
    feelsLike: number,
    temp_min: number,
    temp_max: number,
    weatherType: string,
    city: string,
}

export interface IHourlyForecast {
    time: string,
    temp: number,
    weatherType: string,
}

export interface IAction {
    type: ActionTypes,
    weatherNewValue?: IWeatherState,
    newInputValue?: string,
    hourlyForecast?: IHourlyForecast[],
    isLoading?: boolean,
    isError?: boolean,
    errorMessage?: string,
}

export enum ActionTypes {
    SET_NEW_WEATHER = 'SET_NEW_WEATHER',
    CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE',
    TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING',
    SET_HOURLY_FORECAST = 'SET_HOURLY_FORECAST',
    TOGGLE_IS_ERROR = 'TOGGLE_IS_ERROR',
    SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE',
}

export interface IStoreState {
    weatherReducer: IAppState
}

export interface IColorScheme {
    mainBg: string,

    inputBg: string,
    inputHoverBg: string,

    buttonBg: string,
    buttonHoverBg: string,
    buttonText: string,
    buttonHoverText: string,

    bottomPanelBg: string,

    timeOfDay: string,
}