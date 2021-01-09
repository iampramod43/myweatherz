import React from 'react'
import './Hourly.css'
function Hourly({time, image, desc}) {
    return (
        <div className="hourly">
            <h3>{time}</h3>
            <img src={`http://openweathermap.org/img/wn/${image}@2x.png`} alt=""/>
            <h4>{desc}</h4>
        </div>
    )
}

export default Hourly
