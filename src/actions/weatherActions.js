import {SET_TODAY_WEATHER} from '../constants/actionTypes';

export const initTasks = (weather) => {
    return {
        type: SET_TODAY_WEATHER,
        weather
    }
}