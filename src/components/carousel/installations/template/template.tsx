import React from 'react'
import { IInstallationProps } from '../../../../interfaces/installations'
import { useCanvasAnimation } from '../../../../hooks/animation'

export const InstallationTemplate:React.FunctionComponent<IInstallationProps> = ({config, inputs, draw, running}) => {
    const canvasRef = React.createRef<HTMLCanvasElement>()
    useCanvasAnimation(config, inputs, running, draw, canvasRef)

    return (<canvas width={config.width} height={config.height} ref={canvasRef}></canvas>)
}