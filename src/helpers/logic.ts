import { IColorScheme, IHourlyForecast, IWeatherState } from "./types";
import cloudyIcon from './../icons/static/cloudy-day-1.svg'
import sunnyIcon from './../icons/static/day.svg'
import rainyIcon from './../icons/static/rainy-6.svg'
import fogIcon from './../icons/static/cloudy.svg'
import { setHourlyForecastAC, setMessageErrorAC, setNewWeatherAC, toggleIsErrorAC, toggleIsLoadingAC } from "../redux/actionCreators";
import axios from "axios";
import { AnyAction, Dispatch } from "redux";

// возвращает стили в зависимости от времени суток
export const getColorScheme = (timeHours: number):IColorScheme => {
    if(timeHours > 6 && timeHours <= 12) return {
        buttonBg: 'bg-white',
        buttonHoverBg: 'bg-black',
        buttonText: 'text-black',
        buttonHoverText: 'text-white',

        inputBg: 'bg-sky-400',
        inputHoverBg: 'bg-sky-700',

        mainBg: 'bg-sky-300',
        bottomPanelBg: 'bg-sky-400',

        timeOfDay: 'morning',
    };
    if(timeHours > 12 && timeHours <= 19) return {
        buttonBg: 'bg-white',
        buttonHoverBg: 'bg-blue-600',
        buttonText: 'text-black',
        buttonHoverText: 'text-white',

        inputBg: 'bg-blue-500',
        inputHoverBg: 'bg-blue-600',

        mainBg: 'bg-blue-400',
        bottomPanelBg: 'bg-blue-500',

        timeOfDay: 'day',
    };
    if(timeHours > 19 && timeHours <= 22) return {
        buttonBg: 'bg-black',
        buttonHoverBg: 'bg-blue-600',
        buttonText: 'text-white',
        buttonHoverText: 'text-white',

        inputBg: 'bg-blue-500',
        inputHoverBg: 'bg-blue-600',

        mainBg: 'bg-blue-800',
        bottomPanelBg: 'bg-blue-500',

        timeOfDay: 'evening',
    };
    if(timeHours > 22 || timeHours <= 6) return {
        buttonBg: 'bg-black',
        buttonHoverBg: 'bg-blue-600',
        buttonText: 'text-white',
        buttonHoverText: 'text-black',

        inputBg: 'bg-blue-600',
        inputHoverBg: 'bg-blue-700',

        mainBg: 'bg-blue-900',
        bottomPanelBg: 'bg-blue-600',

        timeOfDay: 'night',
    };
    return {
        buttonBg: 'bg-white',
        buttonHoverBg: 'bg-blue-600',
        buttonText: 'text-black',
        buttonHoverText: 'text-white',

        inputBg: 'bg-blue-500',
        inputHoverBg: 'bg-blue-600',

        mainBg: 'bg-blue-400',
        bottomPanelBg: 'bg-blue-500',

        timeOfDay: 'day',
    };
}

// возвращает иконку в зависимости от типа погоды (Облачно, дождь и т.д.)
export function returnIcon (weatherType: string):string{
    switch(weatherType)
    {
        case('Clouds'):
            return cloudyIcon;

        case('Clear'):
            return sunnyIcon;

        case('Rain'):
            return rainyIcon;

        case('Fog'):
            return fogIcon;

        case('Haze'):
            return fogIcon;
        
        default:
            return '';
    }
}

// выполняется по клику на 'SEARCH'
export const getWeather = (dispatch: Dispatch<AnyAction>, inputValue: string):void => {
    if(inputValue)
    {    
        dispatch(toggleIsLoadingAC(true));
        dispatch(toggleIsErrorAC(false));
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=b835299454f45d8260174129bd291ac3&units=metric`)
        .then((response) => {
            const newWeather: IWeatherState = 
            {
                feelsLike: response.data.main.feels_like, 
                weatherDegrees: response.data.main.temp,
                temp_min: response.data.main.temp_min,
                temp_max: response.data.main.temp_max,
                weatherType: response.data.weather[0].main,
                city: response.data.name,
            }
            dispatch(setNewWeatherAC(newWeather));

            axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${newWeather.city}&limit=5&appid=b835299454f45d8260174129bd291ac3&units=metric`).then((response) => {
                let lat = response.data[0].lat;
                let lon = response.data[0].lon;
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b835299454f45d8260174129bd291ac3&units=metric`).then((response) => {

                    let hourlyForecastArray:IHourlyForecast[] = [
                        {temp: response.data.list[0].main.temp, time: response.data.list[0].dt_txt, weatherType: response.data.list[0].weather[0].main},
                        {temp: response.data.list[1].main.temp, time: response.data.list[1].dt_txt, weatherType: response.data.list[1].weather[0].main},
                        {temp: response.data.list[2].main.temp, time: response.data.list[2].dt_txt, weatherType: response.data.list[2].weather[0].main},
                        {temp: response.data.list[3].main.temp, time: response.data.list[3].dt_txt, weatherType: response.data.list[3].weather[0].main},
                        {temp: response.data.list[4].main.temp, time: response.data.list[4].dt_txt, weatherType: response.data.list[4].weather[0].main},
                    ];
                    dispatch(toggleIsLoadingAC(false));
                    dispatch(setHourlyForecastAC(hourlyForecastArray));
                })
            })
        })
        .catch(function (error) 
        {
            if (error.response) {
            // Запрос был сделан, и сервер ответил кодом состояния, который
            // выходит за пределы 2xx
            console.log(error.response.data.message);
            dispatch(setMessageErrorAC(error.response.data.message))
            console.log(1);
            } else if (error.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
            // http.ClientRequest в node.js
            console.log(error.request);
            console.log(2);
            } else {
            // Произошло что-то при настройке запроса, вызвавшее ошибку
            console.log('Error', error.message);
            console.log(3);
            }
            console.log(error.config);
            dispatch(toggleIsLoadingAC(false));
            dispatch(toggleIsErrorAC(true))
            console.log(4);
        });
    }
}