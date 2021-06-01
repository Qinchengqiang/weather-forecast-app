import React, {useEffect, useState} from 'react';
import _ from "lodash";

const getDay = (index) => {
    let timestamp = new Date().getTime();
    timestamp = timestamp + 24 * 60 * 60 * 1000 * (index + 1);
    let date = new Date(timestamp).getDay() || 7;
    switch (date) {
        case 1:
            return 'Mon';
        case 2:
            return 'Tue';
        case 3:
            return 'Wed';
        case 4:
            return 'Thu';
        case 5:
            return 'Fri';
        case 6:
            return 'Sat';
        case 7:
            return 'Sun';
        default:
            return '';
    }
}

const FutureWeatherWidget = (props) => {
    const date = getDay(props.index);
    const [open, setOpen] = useState(false);
    const [minTemp, setMinTemp] = useState(0);
    const [maxTemp, setMaxTemp] = useState(0);
    const [main, setMain] = useState('');
    const [icon, setIcon] = useState('');
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);
    const [cloud, setCloud] = useState(0);
    const [weatherDescription, setWeatherDescription] = useState("");

    useEffect(() => {
        if (!_.isEmpty(props.weather)) {
            setMinTemp(props.weather.temp.min - 273.15);
            setMaxTemp(props.weather.temp.max - 273.15);
            setMain(props.weather.weather[0].main);
            setIcon(props.weather.weather[0].icon);
            setHumidity(props.weather.humidity);
            setWind(props.weather.wind_speed);
            setCloud(props.weather.clouds);
            setWeatherDescription(props.weather.weather[0].description);

        }
    }, [props.weather])

    useEffect(() => {
        if (props.select !== props.index) setOpen(false);
    }, [props])

    return (
        <>
            <div className='card widgetCard bg-light border-0 mb-2' onClick={() => {
                props.setSelect(props.index);
                setOpen(!open);
            }}>
                <div className='d-flex justify-content-around align-items-end w-100'>
                    <p>{date !== '' ? date.toLocaleString() : ''}</p>
                    <img src={props.iconMatch[icon]} style={{width: "4rem", height: "4rem"}} alt="svgicon"/>
                    <p>{Math.round(minTemp)}-{Math.round(maxTemp)}&deg;</p>
                    <p>{main}</p>
                </div>
                <div className='d-flex text-secondary flex-row justify-content-center w-100'>
                    {open && props.select === props.index ?
                        <div style={{width: "80%", textAlign: 'left'}}>
                            <div className='row justify-content-center'>
                                <h5 className='mb-3 ml-4 text-secondary'>{weatherDescription}</h5>
                            </div>
                            <div className='row justify-content-center'>
                                <p className='mb-0 text-black-50'>humidity</p>
                                <p className='mb-0 ml-4'>{humidity}%</p>
                            </div>
                            <div className='row justify-content-center'>
                                <p className='mb-0 text-black-50'>wind</p>
                                <p className='mb-0 ml-4'>{Math.round(wind * 10) / 10} Km/h </p>
                            </div>
                            <div className='row justify-content-center'>
                                <p className='mb-0 text-black-50'>cloud</p>
                                <p className='mb-3 ml-4'>{cloud}%</p>
                            </div>
                        </div> : <></>}
                </div>
            </div>
        </>
    );
};

export default FutureWeatherWidget;