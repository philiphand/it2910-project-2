import React, { useState } from "react"
import { InstallationInput } from "./input/input"
import { MediaAnalyser } from "./media-line/analyser"
import { MediaLine } from "./media-line/media-line"

import "./navigation.css"
import sliders from "../../img/sliders.svg"
import { IInstallationInput } from "../../interfaces/installations"

export interface INaviagtionProps {
    setMediaAnalyser: (mediaAnalyser: MediaAnalyser) => void,
    updateInputs: (inputs: IInstallationInput) => void,
    inputs: IInstallationInput
}

export const Navigation: React.FunctionComponent<INaviagtionProps> = ({setMediaAnalyser, updateInputs, inputs}) => {
    let [inputOpen, setInputOpen] = useState(false)

    return (<nav>
        <div className={`input ${inputOpen ? 'open' : 'closed'}`} data-testid="inputMenu">
            <InstallationInput updateInputs={updateInputs}></InstallationInput>
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
                <MediaLine setMediaAnalyser={setMediaAnalyser} inputs={inputs}></MediaLine>
            </div>
        </div>
    </nav>)
}