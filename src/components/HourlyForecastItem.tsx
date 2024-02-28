import React from "react";
import { IHourlyForecast } from "../helpers/types";
import { returnIcon } from "../helpers/logic";

export default function HourlyForecastItem (props: IHourlyForecast) {
    let hour:string = props.time.split(' ')[1].split(':')[0]; //из строки например '2023-08-24 09:00:00' извлекается час -> 09

    return (
        <div className="flex flex-col items-center font-thin">
            <div>
                {hour}
            </div>
            <img src={returnIcon(props.weatherType)} alt="" />
            <div className="text-[19px]">
                {Math.round(props.temp)}°
            </div>
        </div>
    )
}