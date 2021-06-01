import React, {useEffect, useState} from 'react';
import _ from 'lodash';

const TodayWeather = (props) => {
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [feels, setFeels] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);
    const [cloud, setCloud] = useState(0);
    const [weatherDescription, setWeatherDescription] = useState("");
    const [icon, setIcon] = useState("01d");

    useEffect(() => {
        if (!_.isEmpty(props.todayWeather)) {
            setSunrise(Date(props.todayWeather.current.sunrise).toLocaleString().split(' ')[4].slice(0, 5));
            setSunset(Date(props.todayWeather.current.sunset).toLocaleString().split(' ')[4].slice(0, 5));
            setTemperature(props.todayWeather.current.temp - 273.15);
            setFeels(props.todayWeather.current.feels_like - 273.15);
            setHumidity(props.todayWeather.current.humidity);
            setWind((props.todayWeather.current.wind_speed * 60) / 1000);
            setCloud(props.todayWeather.current.clouds);
            setIcon(props.todayWeather.current.weather[0].icon);
            setWeatherDescription(props.todayWeather.current.weather[0].description);
        }
    }, [props.todayWeather])

    return (
        <div className='card mt-4 border-0 shadow-sm p-2'>
            {props.isLoading ? <p>Loading data ... </p> : <h4 className='mt-3'>{props.city}</h4>}
            <div>
                <img src={props.iconMatch[icon]} style={{width: "8rem", height: "8rem"}} alt="svgicon"/>
            </div>
            <div className='row justify-content-center'>
                <h3 style={{fontWeight: 'normal'}}>{Math.round(temperature)}&deg;</h3>
                <h4 className='ml-3' style={{alignSelf: 'center', fontWeight: 'normal'}}>{weatherDescription}</h4>
            </div>
            <div className='m-0 mt-4 text-secondary row justify-content-center'>
                <div style={{width: "80%", textAlign: 'left'}}>
                    <div className='row justify-content-center'>
                        <p className='mb-0 text-black-50'>feels</p>
                        <p className='mb-0 pl-4'>{Math.round(feels * 10) / 10}&deg;</p>
                    </div>
                    <div className='row justify-content-center'>
                        <p className='mb-0 text-black-50'>humidity</p>
                        <p className='mb-0 ml-4'>{humidity}%</p>
                    </div>
                    <div className='row justify-content-center'>
                        <p className='mb-0 text-black-50'>wind</p>
                        <p className='mb-0 ml-4'>{Math.round(wind * 10) / 10} Km/h </p>
                    </div>
                    <div className='row justify-content-center mb-3'>
                        <p className='mb-0 text-black-50'>cloud</p>
                        <p className='mb-3 ml-4'>{cloud}%</p>
                    </div>
                    <div className='row justify-content-center'>
                        <p className='mb-0'>{sunrise}</p>
                        <p className='mb-0 pl-4'>{sunset}</p>
                    </div>
                    <div className='mb-3 row justify-content-center'>
                        <p className='text-black-50'>sunrise</p>
                        <p className='pl-4 text-black-50'>sunset</p>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default TodayWeather;