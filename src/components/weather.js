import React, {useEffect, useState, Suspense} from 'react';
// import TodayWeather from "./weatherComponents/todayWeather";
// import FutureWeather from "./weatherComponents/futureWeather";
import {useDispatch} from "react-redux";
import _ from "lodash";
import {
    icon00, icon01, icon02, icon03, icon04, icon05,
    icon06, icon07, icon08, icon09, icon10, icon11,
    icon12, icon13, icon14, icon15, icon16, icon17
} from '../assets/animatedIcons_match/index';
import {fetchOpenWeather} from '../actions/weatherActions';

const TodayWeather = React.lazy(() => import("./weatherComponents/todayWeather"));
const FutureWeather = React.lazy(() => import('./weatherComponents/futureWeather'));


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
            (position) => { // success
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },

            (error) => {   // fail
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
    const [isLoading, setIsLoading] = useState(false);

    const [location, setLocation] = useState({});
    const [city, setCity] = useState('');
    const [todayWeather, setTodayWeather] = useState({});
    const [futureWeather, setFutureWeather] = useState({});

    useEffect(() => {
        getLocation(setLocation);
    }, []);

    useEffect(() => {
        if (!_.isEmpty(location)) {
            setIsLoading(true);
            dispatch(fetchOpenWeather(location))
                .then(
                    (data) => {
                        setCity(data.timezone.split('/')[1]);
                        setTodayWeather({current: data.current, hourly: data.hourly});
                        setFutureWeather(data.daily);
                        setIsLoading(false);
                    },
                    () => {
                        setCity("Sydney");
                        console.log(`Can not get data from openWeather API.`);
                        alert(`Something wrong when downloading data.`);
                        setIsLoading(false);
                    }
                )
        }
    }, [dispatch, location]);

    return (
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <Suspense fallback={<div className='card mt-4 border-0 shadow-sm p-2' style={{height: '10rem'}}></div>}>
                    <TodayWeather isLoading={isLoading} city={city} todayWeather={todayWeather} iconMatch={iconMatch}/>
                </Suspense>
            </div>
            <div className='col-md-6'>
                <Suspense fallback={<div className='card mt-4 border-0 shadow-sm p-2'>loading...</div>}>
                    <FutureWeather isLoading={isLoading} futureWeather={futureWeather} iconMatch={iconMatch}/>
                </Suspense>
            </div>
        </div>
    );
};

export default Weather;