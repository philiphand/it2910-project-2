import React from 'react'
import { IInstallationProps } from '../../../../interfaces/installations'
import { useCanvasAnimation } from '../../../../hooks/animation'
import { draw } from './animation'

export const Hypnotizer:React.FunctionComponent<IInstallationProps> = ({config, inputs, running}) => {
    const canvasRef = React.createRef<HTMLCanvasElement>()
    useCanvasAnimation(config, inputs, running, draw, canvasRef)

    return (<canvas width={config.width} height={config.height} ref={canvasRef}></canvas>)
}