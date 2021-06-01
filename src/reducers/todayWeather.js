import {SET_TODAY_WEATHER} from '../constants/actionTypes';

// set state initial
const initState = {};

const todayWeather = (state = initState, action = {}) => {
    switch (action.type) {
        case SET_TODAY_WEATHER:
            // TODO
            // update initState


            return state;
        default:
            return state;
    }
}

export default todayWeather;