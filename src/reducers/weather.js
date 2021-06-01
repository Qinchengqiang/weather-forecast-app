import {SET_WEATHER} from '../constants/actionTypes';

// set state initial
const initState = {};

const weather = (state = initState, action = {}) => {
    switch (action.type) {
        case SET_WEATHER:
            return action.weather;
        default:
            return state;
    }
}

export default weather;