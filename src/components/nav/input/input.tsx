import React, { useContext } from 'react'
import { InputContext } from '../../../inputContext'
import { IInstallationInput } from '../../../interfaces/installations'
import { ColorPicker } from './color-picker/color-picker'

import './input.css'

export interface IInputComponentProps {
    updateInputs: (inputs: IInstallationInput) => void
}

export const InstallationInput: React.FunctionComponent<IInputComponentProps> = ({ updateInputs }) => {
    let inputs = useContext(InputContext)

    return (<div className="input">
        <section className="colors">
            <h2>Colors</h2>
            <div className="color-picker-wrapper">
                <div className="from">
                    <span>From</span>
                    <ColorPicker color={inputs.rgbaFrom} updateColor={(color) => { updateInputs({...inputs, rgbaFrom: color}) } } toOrFrom="from"></ColorPicker>
                </div>
                
                <div className="to">
                    <span>To</span>
                    <ColorPicker color={inputs.rgbaTo} updateColor={(color) => { updateInputs({...inputs, rgbaTo: color}) } } toOrFrom="to"></ColorPicker>
                </div>
            </div>
        </section>

        <section className="complexity">
            <h2>Complexity</h2>
        </section>

        <section className="complexity">
            <h2>Third input</h2>
        </section>
    </div>)
}