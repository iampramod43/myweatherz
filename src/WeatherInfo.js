import React, { useEffect } from 'react'
import './WeatherInfo.css'
import sunset from './png/icons8-sunset-96.png'
import sunrise from './png/icons8-sunrise-96.png'
import { useSelector } from 'react-redux'
import { selectCity } from './features/citySlice'

function WeatherInfo({lat, lon, dt, climate, rain, rise, set, temp, feelsLike, icon}) {

    const city = useSelector(selectCity);
    return (
        <div className="weatherInfo">
            <div className="weatherInfo__header">
            <h2 className="weatherInfo__title"> Weather</h2>
            <h2 className="weatherInfo__dt">{dt}</h2>
            </div>
            <div className="weatherInfo__info">
                <div className="weatherInfo__left">
                    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon"/>
                    <div className="weatherInfo__details">
                        <h3>{city}</h3>
                        <p>{climate}</p>
                    </div>
                    <div className="weatherInfo__sun">
                        <div className="weatherInfo__rise">
                            <img src={sunrise} alt=""/>
                            <p>{rise}</p>
                        </div>
                        <div className="weatherInfo__rise">
                            <img src={sunset} alt=""/>
                            <p>{set}</p>
                        </div>
                    </div>
                </div>
                <div className="weatherInfo__right">
                    <p className="weatherInfo__temperature">{temp}°C</p>
                    <p className="weatherInfo__minMax">Feels like {feelsLike}°C</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherInfo
