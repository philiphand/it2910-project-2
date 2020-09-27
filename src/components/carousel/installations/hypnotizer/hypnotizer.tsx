import React from 'react'
import { IInstallationProps } from '../../../../interfaces/installations'
import { useCanvasAnimation } from '../../../../hooks/animation'
import { draw } from './animation'

export const HypnotizerInstallation:React.FunctionComponent<IInstallationProps> = ({config, inputs, running}) => {
    const canvasRef = React.createRef<HTMLCanvasElement>()
    useCanvasAnimation(config, inputs, running, draw, canvasRef)

    return (<div className="installation">
        <canvas width={config.width} height={config.height} ref={canvasRef}></canvas>
    </div>)
}