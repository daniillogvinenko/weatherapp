import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { weatherReducer } from "./reducers/weatherReducer";

const reducers = combineReducers({weatherReducer: weatherReducer})

export const store = createStore(reducers, applyMiddleware(thunk))