import React from "react";
import { useSelector } from "react-redux";
import { IStoreState } from "../helpers/types";


export default function MyError (){

    let message = useSelector<IStoreState, string>(state => state.weatherReducer.errorMessage);

    return(
        <div className="text-[30px] font-thin capitalize">
            {message}
        </div>
    )
}