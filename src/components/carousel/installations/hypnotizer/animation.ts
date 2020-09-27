import { IAnimationTiming } from "../../../../hooks/animation"
import { IInstallationConfig, IInstallationInput } from "../../../../interfaces/installations"
import { ColorUtil } from "../../../../util/colors"

function drawCircle(radius: number, color: CanvasGradient, ctx: CanvasRenderingContext2D, x:number, y:number, linewidth:number) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = linewidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}    

export const draw = (timing: IAnimationTiming, config: IInstallationConfig, inputs: IInstallationInput, ctx: CanvasRenderingContext2D) => {

    const center = {
        x: config.width/2,
        y: config.height/2
    }

    const data = config.mediaAnalyser.getByteFrequencyData()

    ctx.clearRect(0, 0, config.width, config.height)

    const gradient: CanvasGradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, 256)
    gradient.addColorStop(0, ColorUtil.rgbaString(inputs.rgbaFrom))
    gradient.addColorStop(1, ColorUtil.rgbaString(inputs.rgbaTo))

    data.forEach(frequency => {
        if (frequency % 3 === 0) {
        drawCircle(frequency * 0.75, gradient, ctx, center.x, center.y, 256/data.length * 0.75)
        }
    })
}