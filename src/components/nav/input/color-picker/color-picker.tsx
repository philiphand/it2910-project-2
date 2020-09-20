import React from 'react'
import { ColorUtil, IRgbaColor } from '../../../../util/colors'

import "./color-picker.css"

export interface IColorPickerProps {
    color: IRgbaColor,
    updateColor: (color: IRgbaColor) => void
}

export const ColorPicker: React.FunctionComponent<IColorPickerProps> = ({color, updateColor}) => {
    return (
        <div className="color-picker">
            <div>
                <label>R</label>
                <input type="range" min="0" max="255" value={color.r} onChange={(e) => updateColor({...color, r: parseInt(e.target.value)})}></input>
            </div>

            <div>
                <label>G</label>
                <input type="range" min="0" max="255" value={color.g} onChange={(e) => updateColor({...color, g: parseInt(e.target.value)})}></input>
            </div>

            <div>
                <label>B</label>
                <input type="range" min="0" max="255" value={color.b} onChange={(e) => updateColor({...color, b: parseInt(e.target.value)})}></input>
            </div>

            <div>
                <label>A</label>
                <input type="range" min="0" max="255" value={color.a} onChange={(e) => updateColor({...color, a: parseInt(e.target.value)})}></input>
            </div>

            <div className="preview" style={{ background: ColorUtil.rgbaString(color) }}></div>
        </div>
    )
}