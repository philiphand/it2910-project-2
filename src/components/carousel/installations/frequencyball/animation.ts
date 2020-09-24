import { IAnimationTiming } from "../../../../hooks/animation"
import { IInstallationConfig, IInstallationInput } from "../../../../interfaces/installations"
import { ColorUtil } from "../../../../util/colors"

export const draw = (animationTiming: IAnimationTiming, config: IInstallationConfig, inputs: IInstallationInput, ctx: CanvasRenderingContext2D) => {
    const center = {
        x: config.width/2,
        y: config.height/2
    }
    const minReach = 20
    
    ctx.clearRect(0, 0, 1000, 1000)
    
    let data = config.mediaAnalyser.getByteFrequencyData()
    
    let scaling = (((Math.min(config.width, config.height) / 2) - minReach) / 256)

    //The upper frequencies are mostly 0, select only the first half for visualization
    const NUM_BARS = Math.floor((data.length*2)/2)
    const width = Math.min(config.height/NUM_BARS, config.width/NUM_BARS)

    for (let i = 0; i < NUM_BARS; i++) {
        let rotation = (360 / NUM_BARS)
        let fill
        if (i <= NUM_BARS / 2) {
            let reach = data[i] * scaling + minReach
            fill = ColorUtil.rgbTweenString(inputs.rgbaFrom, inputs.rgbaTo, 2 * i / NUM_BARS, 0.8)
            drawFrequencyTriangle(ctx, rotation, width, reach, fill, center)
        }
        else {
            let reach = data[NUM_BARS-i] * scaling + minReach
            fill = ColorUtil.rgbTweenString(inputs.rgbaTo, inputs.rgbaFrom, (i * 2 - NUM_BARS) / NUM_BARS, 0.8)
            drawFrequencyTriangle(ctx, rotation, width, reach, fill, center)
        }
    }
}

const drawFrequencyTriangle = (ctx: CanvasRenderingContext2D, rotation: number, width: number, reach: number, fill:string, center: { x: number, y: number} ) => {
    ctx.beginPath()
    ctx.moveTo(center.x, center.y)
    ctx.lineTo(center.x+(width/2), center.y + reach)
    ctx.lineTo(center.x-(width/2), center.y + reach)
    ctx.lineTo(center.x, center.y)
    ctx.closePath()

    ctx.fillStyle = fill
    ctx.fill()

    ctx.translate(center.x, center.y)
    ctx.rotate(((Math.PI) / 180)*rotation)
    ctx.translate(-center.x, -center.y)
}