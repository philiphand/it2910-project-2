import React, { useContext } from 'react'
import { MediaContext } from '../../mediaContext'
import { InputContext } from '../../inputContext'

import { OscilliscopeInstallation } from './installations/oscilliscope/oscilliscope'
import { Hypnotizer } from './installations/hypnotizer/template'
import { FrequencyBallInstallation } from './installations/frequencyball/frequency-ball'

import { Poetry } from '../poetry/poetry'

import "./carousel.css"

export const Carousel:React.FunctionComponent<any> = () => {
    const mediaAnalyser = useContext(MediaContext)
    const inputs = useContext(InputContext)

    if (!mediaAnalyser)
        return <div className="waiting-for-media">Press play to see the animation</div>

    return (<div className="carousel">
        <OscilliscopeInstallation 
            config={{
                width: 1000,
                height: 400,
                mediaAnalyser
            }}
            inputs={inputs} 
            running={true}></OscilliscopeInstallation>

        <FrequencyBallInstallation 
            config={{
                width: 400,
                height: 400,
                mediaAnalyser
            }}
            inputs={inputs} 
            running={true}></FrequencyBallInstallation>

        <Hypnotizer
            config={{
                width: 1000,
                height: 400,
                mediaAnalyser
            }}
            inputs={inputs} 
            running={true}></Hypnotizer>

        <Poetry lines="4"></Poetry>
    </div>)
}