import React from 'react';
import TodayWeather from "./weatherComponents/todayWeather";
import FutureWeather from "./weatherComponents/futureWeather";

const Weather = () => {
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