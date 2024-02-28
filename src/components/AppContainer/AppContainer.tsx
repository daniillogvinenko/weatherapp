import React, { useEffect, useState } from "react";
import MyInput from "../../UI/MyInput/MyInput";
import { Testing } from "../Testing";
import { useDispatch, useSelector } from "react-redux";
import { IStoreState } from "../../helpers/types";
import Preloader from "../../UI/Preloader/Preloader";
import { getColorScheme, getWeather } from "../../helpers/logic";
import Footer from "../Footer";
import MyError from "../MyError";
import { Header } from "../Header";

export default function AppContainer() {
    const inputValue = useSelector<IStoreState, string>((state) => state.weatherReducer.inputValue);
    const isLoading = useSelector<IStoreState, boolean>((state) => state.weatherReducer.isLoading);
    const isError = useSelector<IStoreState, boolean>((state) => state.weatherReducer.isError);
    const dispatch = useDispatch();

    const currentDate = new Date();
    let colorScheme = getColorScheme(currentDate.getHours()); // let colorScheme = getColorScheme(currentDate.getHours())

    return (
        <div className="flex flex-col justify-between min-h-screen">
            <div>
                <div
                    className={`${colorScheme.mainBg} text-white rounded-[25px] py-6 px-5 w-96 mx-auto mt-10 shadow-lg`}
                >
                    <Header />
                    <div className="flex justify-between rounded-[15px] shadow-lg mb-9">
                        <MyInput
                            className={`text-[18px] font-thin ${colorScheme.inputBg} shadow-inner w-[80%] py-3 px-6 rounded-l-[15px] 
                            hover:${colorScheme.inputHoverBg} duration-200 focus:${colorScheme.inputHoverBg}`}
                            inputValue={inputValue}
                        />
                        <button
                            className={`${colorScheme.buttonBg} px-5 ${colorScheme.buttonText} rounded-r-[15px] hover:${colorScheme.buttonHoverBg} hover:${colorScheme.buttonHoverText} duration-200`}
                            onClick={() => getWeather(dispatch, inputValue)}
                        >
                            SEARCH
                        </button>
                    </div>

                    {isLoading ? (
                        <Preloader />
                    ) : isError ? (
                        <MyError />
                    ) : (
                        <Testing bgColor={colorScheme.bottomPanelBg} />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
