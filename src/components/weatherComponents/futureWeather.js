import React from 'react';

const FutureWeather = (props) => {
    return (
        <div className='card mt-4 border-0 shadow-sm p-2'>
            {props.isLoading ?
                <p>Loading ... </p>
                :
                <p>{props.city}</p>
            }
        </div>
    );
};

export default FutureWeather;