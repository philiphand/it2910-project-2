import { IAnimationTiming } from "../../../../hooks/animation"
import { IInstallationConfig, IInstallationInput } from "../../../../interfaces/installations"
import { ColorUtil } from "../../../../util/colors"

const NUM_BARS = 256;

export const draw = (animationTiming: IAnimationTiming, config: IInstallationConfig, inputs: IInstallationInput, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 1000, 1000)
    
    let data = config.mediaAnalyser.getByteFrequencyData()
    
    let scaling = (Math.min(config.width, config.height) / 2) / 256

    for (let i = 0; i < data.length; i++) {
        let rotation = (360 / NUM_BARS)
        let fill
        if (i <= NUM_BARS / 2) {
            let reach = data[i] * scaling + 20
            fill = ColorUtil.rgbTweenString(inputs.rgbaFrom, inputs.rgbaTo, 2 * i / NUM_BARS, 0.8)
            drawFrequencyTriangle(ctx, rotation, reach, fill)
        }
        else {
            let reach = data[128 + (-i + 128)] * scaling + 20
            fill = ColorUtil.rgbTweenString(inputs.rgbaTo, inputs.rgbaFrom, (i * 2 - 256) / NUM_BARS, 0.8)
            drawFrequencyTriangle(ctx, rotation, reach, fill)
        }
    }
}

const drawFrequencyTriangle = (ctx: CanvasRenderingContext2D, rotation: number, reach: number, fill:string ) => {
    ctx.beginPath()
    ctx.moveTo(200, 200)
    ctx.lineTo(200+(400/320), 200 + reach)
    ctx.lineTo(200-(400/320), 200 + reach)
    ctx.lineTo(200, 200)
    ctx.closePath()

    ctx.fillStyle = fill
    ctx.fill()

    ctx.translate(200, 200)
    ctx.rotate(((Math.PI) / 180)*rotation)
    ctx.translate(-200, -200)
}