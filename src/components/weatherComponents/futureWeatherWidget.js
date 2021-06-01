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

    useEffect(() => {
        if (!_.isEmpty(props.weather)) {
            setMinTemp(props.weather.temp.min - 273.15);
            setMaxTemp(props.weather.temp.max - 273.15);
            setMain(props.weather.weather[0].main);
            setIcon(props.weather.weather[0].icon);
        }
    }, [props.weather])

    return (
        <div className='card bg-light border-0 mb-2'>
            <div className='d-flex justify-content-around align-items-end w-100'>
                <p>{date !== '' ? date.toLocaleString() : ''}</p>
                <img src={props.iconMatch[icon]} style={{width: "4rem", height: "4rem"}} alt="svgicon"/>
                <p>{Math.round(minTemp)}-{Math.round(maxTemp)}&deg;</p>
                <p>{main}</p>
            </div>
        </div>
    );
};

export default FutureWeatherWidget;