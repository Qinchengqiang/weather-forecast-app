import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import FutureWeatherWidget from './futureWeatherWidget';

const FutureWeather = (props) => {
    const [futureWeather, setFutureWeather] = useState([]);
    const [select, setSelect] = useState(-1);

    useEffect(() => {
        if (!_.isEmpty(props.futureWeather)) {
            setFutureWeather(props.futureWeather);
        }
    }, [props.futureWeather])

    return (
        <div className='card mt-4 border-0 shadow-sm p-2'>
            {props.isLoading ?
                <p>Loading data ... </p>
                :
                <p>{props.city}</p>
            }
            {!_.isEmpty(futureWeather) ? [0, 1, 2, 3, 4].map(index => (
                <FutureWeatherWidget key={index.toString()} index={index} weather={futureWeather[index]}
                                     iconMatch={props.iconMatch} select={select} setSelect={setSelect}/>
            )) : [0, 1, 2, 3, 4].map(index => (
                <div key={index.toString() + 'loading'} className='card bg-light border-0 mb-2'
                     style={{height: '4rem'}}>{' '}</div>))}
        </div>
    );
};

export default FutureWeather;