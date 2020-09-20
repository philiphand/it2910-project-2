import React, { useContext } from 'react'
import { MediaContext } from '../../mediaContext'
import { InstallationTemplate } from './installations/template/template'
import "./carousel.css"
import { OscilliscopeInstallation } from './installations/oscilliscope/oscilliscope'
import { Poetry } from '../poetry/poetry'
import { Hypnotizer } from './installations/hypnotizer/template'

export const Carousel:React.FunctionComponent<any> = () => {
    const mediaAnalyser = useContext(MediaContext)

    if (!mediaAnalyser)
        return <div className="waiting-for-media">Press play to see the animation</div>

    return (<div className="carousel">
        <OscilliscopeInstallation 
            config={{
                width: 1000,
                height: 400,
                mediaAnalyser
            }}
            inputs={{ }} 
            running={true}></OscilliscopeInstallation>

        <Hypnotizer
            config={{
                width: 1000,
                height: 400,
                mediaAnalyser
            }}
            inputs={{ }} 
            running={true}></Hypnotizer>
        
        <InstallationTemplate 
            config={{
                width: 400,
                height: 400,
                mediaAnalyser
            }}
            inputs={{ }} 
            running={true}></InstallationTemplate>

        <Poetry lines="4"></Poetry>
    </div>)
}