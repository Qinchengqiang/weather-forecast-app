import {SET_WEATHER} from '../constants/actionTypes';
import axios from "axios";
import {openWeatherKey} from '../constants/openWeatherKey.js'

export const setWeather = (weather) => {
    return {
        type: SET_WEATHER,
        weather
    }
}

export const fetchOpenWeather = (location) => {
    const lat = location.latitude;
    const lon = location.longitude;
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherKey}`;
    return dispatch => {
        return axios.get(oneCallUrl).then(res => {
            dispatch(setWeather(res.data));
            return res.data;
        })
    }
}