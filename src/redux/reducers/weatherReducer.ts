import { IAction, ActionTypes, IAppState } from "../../helpers/types";


const initialState: IAppState = {
    weatherState: {
        feelsLike: 0,
        temp_min: 0,
        temp_max: 0,
        weatherDegrees: 0,
        weatherType: '',
        city: '',
    },
    isLoading: false,
    inputValue: '',
    hourlyForecast: [],
    isError: false,
    errorMessage: ''
}

export const weatherReducer = (state = initialState, action: IAction): IAppState => {
    switch(action.type)
    {
        case ActionTypes.SET_NEW_WEATHER:
        {
            if(action.weatherNewValue)
            {
                return {...state, weatherState: action.weatherNewValue};
            }
            else return state;
        }

        case ActionTypes.CHANGE_INPUT_VALUE:
        {
            if(action.newInputValue || action.newInputValue === '')
            {
                return {...state, inputValue: action.newInputValue}
            }
            else return state;
        }

        case ActionTypes.TOGGLE_IS_LOADING:
        {
            if(action.isLoading)
            {
                return {...state, isLoading: action.isLoading}
            }
            if(action.isLoading === false)
            {
                return {...state, isLoading: action.isLoading}
            }
            else return state;
        }

        case ActionTypes.SET_HOURLY_FORECAST:
        {
            if(action.hourlyForecast)
            {
                return {...state, hourlyForecast: action.hourlyForecast}
            }
            else return state;
        }

        case ActionTypes.TOGGLE_IS_ERROR:
        {
            if(action.isError || action.isError === false)
            {
                return {...state, isError: action.isError}
            }
            else return state;
        }

        case ActionTypes.SET_ERROR_MESSAGE:
        {
            if(action.errorMessage)
            {
                return {...state, errorMessage: action.errorMessage}
            }
            else return state;
        }

        default:
            return state;
    }
}

