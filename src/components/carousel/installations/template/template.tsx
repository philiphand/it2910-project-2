import React from 'react'
import { IInstallationProps } from '../../../../interfaces/installations'
import { useCanvasAnimation } from '../../../../hooks/animation'

export const InstallationTemplate:React.FunctionComponent<IInstallationProps> = ({width, height, inputs, draw, running}) => {
    const canvasRef = React.createRef<HTMLCanvasElement>()
    useCanvasAnimation(inputs, running, draw, canvasRef)

    return (<canvas width={width} height={height} ref={canvasRef}></canvas>)
}