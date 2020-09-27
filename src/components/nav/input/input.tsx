import React, { useContext } from 'react'
import { InputContext } from '../../../inputContext'
import { IInstallationInput } from '../../../interfaces/installations'
import { MediaContext } from '../../../mediaContext'
import { ColorPicker } from './color-picker/color-picker'
import { SongPicker } from './song-picker/song-picker'

import './input.css'

export interface IInputComponentProps {
    updateInputs: (inputs: IInstallationInput) => void
}

export const InstallationInput: React.FunctionComponent<IInputComponentProps> = ({ updateInputs }) => {
    let inputs = useContext(InputContext)
    let media = useContext(MediaContext)

    return (<div className="input">
        <section className="colors">
            <h2>Colors</h2>
            <div className="color-picker-wrapper">
                <div className="from">
                    <span>From</span>
                    <ColorPicker color={inputs.rgbaFrom} updateColor={(color) => { 
                        updateInputs({...inputs, rgbaFrom: color}) 
                        localStorage.setItem('rgbaFrom', JSON.stringify(color))
                    }} toOrFrom="from"></ColorPicker>
                </div>
                
                <div className="to">
                    <span>To</span>
                    <ColorPicker color={inputs.rgbaTo} updateColor={(color) => { 
                        updateInputs({...inputs, rgbaTo: color}) 
                        localStorage.setItem('rgbaTo', JSON.stringify(color))
                    }} toOrFrom="to"></ColorPicker>
                </div>
            </div>
        </section>

        <section className="complexity">
            <h2>Complexity</h2>
            <input 
                type="range" 
                min="4" 
                max="10" 
                step="1" 
                value={inputs.complexity} 
                onChange={(e) => { 
                    updateInputs({...inputs, complexity: parseInt(e.target.value)}) 
                    media?.setComplexity(parseInt(e.target.value))
                    localStorage.setItem('complexity',e.target.value.toString())
                }}></input>
        </section>

        <section className="song">
            <h2>Song</h2>
            <SongPicker song={inputs.song} updateSong={(song) => { 
                updateInputs({...inputs, song: song})
                localStorage.setItem('song', song)
                }} />
        </section>
    </div>)
}