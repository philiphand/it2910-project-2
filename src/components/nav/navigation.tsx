import React, { useState } from "react"
import { InstallationInput } from "./input/input"
import { MediaAnalyser } from "./media-line/analyser"
import { MediaLine } from "./media-line/media-line"

import "./navigation.css"
import sliders from "../../img/sliders.svg"

export interface INaviagtionProps {
    setMediaAnalyser: (mediaAnalyser: MediaAnalyser) => void
}

export const Navigation: React.FunctionComponent<INaviagtionProps> = ({setMediaAnalyser}) => {
    let [inputOpen, setInputOpen] = useState(false)

    return (<nav>
        <div className={`input ${inputOpen ? 'open' : 'closed'}`}>
            <InstallationInput></InstallationInput>
        </div>

        <div className="navigation-line">
            <img 
                className="btn-input" 
                onClick={() => setInputOpen(!inputOpen)}
                src={sliders}
                width={24}
                height={24} 
                alt="Input"/>
            
            <div className="media">
                <MediaLine setMediaAnalyser={setMediaAnalyser}></MediaLine>
            </div>
        </div>
    </nav>)
}