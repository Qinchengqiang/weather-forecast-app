import React, {useEffect, useState} from 'react';
import TodayWeather from "./weatherComponents/todayWeather";
import FutureWeather from "./weatherComponents/futureWeather";
import {useDispatch} from "react-redux";
import _ from "lodash";
import {
    icon00, icon01, icon02, icon03, icon04, icon05,
    icon06, icon07, icon08, icon09, icon10, icon11,
    icon12, icon13, icon14, icon15, icon16, icon17
} from '../assets/animatedIcons_match/index';
import {fetchOpenWeather} from '../actions/weatherActions';

// description : iconName
const iconMatch = {
    '01d': icon00, '01n': icon01,
    '02d': icon02, '02n': icon03,
    '03d': icon04, '03n': icon05,
    '04d': icon06, '04n': icon07,
    '09d': icon08, '09n': icon09,
    '10d': icon10, '10n': icon11,
    '11d': icon12, '11n': icon13,
    '12d': icon14, '12n': icon15,
    '50d': icon16, '50n': icon17
}

const getLocation = (setLocation) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // success
            (position) => {
                console.log(position.coords);
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },

            // fail
             (error) => {
                 console.log(error);
                // set default location (Sydney, NSW)
                 setLocation({
                     latitude: -33.9444763,
                     longitude: 151.0516113
                 });
            }
        );
    } else {
        alert('Browser do not support geolocation.');
    }
};

const Weather = () => {
    const dispatch = useDispatch();
    const [location, setLocation] = useState({});

    useEffect(() => {
        getLocation(setLocation);
    },[]);

    useEffect(() => {
        if (!_.isEmpty(location)) {
            dispatch(fetchOpenWeather(location));
            // TODO
            // update weather state


        }
    }, [dispatch, location]);

    return (
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <TodayWeather/>
            </div>
            <div className='col-md-6'>
                <FutureWeather/>
            </div>


        </div>
    );
};

export default Weather;