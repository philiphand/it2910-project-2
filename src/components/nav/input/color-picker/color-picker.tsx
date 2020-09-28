import React from 'react'
import { ColorUtil, IRgbaColor } from '../../../../util/colors'

import "./color-picker.css"

export interface IColorPickerProps {
    color: IRgbaColor,
    updateColor: (color: IRgbaColor) => void,
    toOrFrom: string
}

export const ColorPicker: React.FunctionComponent<IColorPickerProps> = ({color, updateColor, toOrFrom}) => {
    return (
        <div className="color-picker">
            <div>
                <label>R</label>
                <input type="range" min="0" max="255" value={color.r} onChange={(e) => updateColor({...color, r: parseInt(e.target.value)})} data-testid={toOrFrom + "ColorR"}></input>
            </div>

            <div>
                <label>G</label>
                <input type="range" min="0" max="255" value={color.g} onChange={(e) => updateColor({...color, g: parseInt(e.target.value)})} data-testid={toOrFrom + "ColorG"}></input>
            </div>

            <div>
                <label>B</label>
                <input type="range" min="0" max="255" value={color.b} onChange={(e) => updateColor({...color, b: parseInt(e.target.value)})} data-testid={toOrFrom + "ColorB"}></input>
            </div>

            <div>
                <label>A</label>
                <input type="range" min="0" max="100" step="1" value={color.a*100} onChange={(e) => updateColor({...color, a: parseInt(e.target.value)*0.01})} data-testid={toOrFrom + "ColorA"}></input>
            </div>

            <div className="preview" style={{ background: ColorUtil.rgbaString(color) }} data-testid={toOrFrom + "ColorPreview"}></div>
        </div>
    )
}