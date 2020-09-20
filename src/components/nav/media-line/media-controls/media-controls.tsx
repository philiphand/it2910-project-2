import React from "react"

import PlayIcon from "../../../../img/play.svg"
import PauseIcon from "../../../../img/pause.svg"

import "./media-controls.css"

export interface IMediaControlsProps {
    playing: boolean,
    play: () => void,
    pause: () => void,
    elapsed: number,
    duration: number
}

export const MediaControls: React.FunctionComponent<IMediaControlsProps> = ({ playing, play, pause, elapsed, duration }) => {
    const percentComplete = (elapsed/duration)*100;

    return (<div className="media-controls">
        <img 
            src={(playing ? PauseIcon : PlayIcon)} 
            onClick={(playing ? pause : play)} 
            alt={(playing ? "Pause" : "Play")} 
            width={24} 
            height={24}/>

        <div className="elapsed-wrapper">
            <div className="duration-line"></div>
            <div className="elapsed-dot" style={{left: `${percentComplete}%`}}></div>
        </div>
    </div>)
}