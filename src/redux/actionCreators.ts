import { ActionTypes, IAction, IHourlyForecast, IWeatherState } from "../helpers/types";

//Action Creators
export function setNewWeatherAC (newWeatherValue: IWeatherState):IAction  {
    let action: IAction = {type: ActionTypes.SET_NEW_WEATHER, weatherNewValue: newWeatherValue}
    return action;
}

export function changeInputValueAC (newInputValue: string):IAction {
    return {type: ActionTypes.CHANGE_INPUT_VALUE, newInputValue: newInputValue}
}

export function toggleIsLoadingAC (isLoading: boolean):IAction {
    return {type: ActionTypes.TOGGLE_IS_LOADING, isLoading: isLoading}
}

export function setHourlyForecastAC (hourlyForecast: IHourlyForecast[]):IAction {
    return {type: ActionTypes.SET_HOURLY_FORECAST, hourlyForecast: hourlyForecast}
}

export function toggleIsErrorAC (isError: boolean):IAction {
    return {type: ActionTypes.TOGGLE_IS_ERROR, isError: isError}
}

export function setMessageErrorAC (message: string):IAction {
    return {type: ActionTypes.SET_ERROR_MESSAGE, errorMessage: message}
}