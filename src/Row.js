import React from 'react'
import './Row.css'
function Row({daily, day, night, morn, eve, min, max}) {
    return (
        <div className="row">
            <p>{daily}</p>
            <div className="row__details">
                <p>{min}</p>
                <p>{max}</p>
                <p>{day}</p>
                <p>{night}</p>
                <p>{morn}</p>
                <p>{eve}</p>
            </div>
        </div>
    )
}

export default Row
