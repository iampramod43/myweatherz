import React, {useEffect, useRef} from 'react'
import './ProgressBar.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {TweenMax, Power3} from 'gsap';
function ProgressBar( {title, per }) {
    let pb = useRef(null);

    useEffect(() => {
        TweenMax.to(
            pb,
            0.8,
            {
                opacity: 1,
                y: -20,
                ease: Power3.easeOut,
            }
        )
    }, [])
    const percentage = per;
    return (
        <div className="progressBar"
        ref={ele => {pb = ele}}
        >
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <h3>{title}</h3>
        </div>
    )
}

export default ProgressBar
