import React from "react";
import { useSelector } from "react-redux";
import { IHourlyForecast, IStoreState, IWeatherState } from "../helpers/types";
import { returnIcon } from "../helpers/logic";
import HourlyForecastItem from "./HourlyForecastItem";

interface ITestingProps {
    bgColor: string;
}

export const Testing = (props: ITestingProps) => {
    let weather = useSelector<IStoreState, IWeatherState>((state) => state.weatherReducer.weatherState);
    let hourlyForecast = useSelector<IStoreState, IHourlyForecast[]>((state) => state.weatherReducer.hourlyForecast);

    return (
        <div>
            <div className="text-[30px] font-thin">{weather.city}</div>
            <img src={returnIcon(weather.weatherType)} alt="" className="w-[100%]" />
            <div className="mb-6">
                <span className="text-[85px]">
                    {Math.round(weather.weatherDegrees)}
                    <span className="font-thin">°</span>
                </span>
                <span className="text-[26px] font-thin"> {weather.weatherType}</span>
            </div>
            <div className={`${props.bgColor} p-5 rounded-[15px] shadow-lg`}>
                <div className="text-[20px] mb-4 font-thin">Feels like: {Math.round(weather.feelsLike)}</div>
                <div className="text-[20px] mb-4 font-thin">Min temperature: {Math.round(weather.temp_min)}</div>
                <div className="text-[20px] font-thin">Max temperature: {Math.round(weather.temp_max)}</div>
            </div>

            <div className="flex mt-[30px]">
                {hourlyForecast
                    ? hourlyForecast.map((item) => <HourlyForecastItem key={JSON.stringify(item)} {...item} />)
                    : null}
            </div>
        </div>
    );
};
