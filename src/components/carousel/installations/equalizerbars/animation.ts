import { IAnimationTiming } from "../../../../hooks/animation"
import { IInstallationConfig, IInstallationInput } from "../../../../interfaces/installations"
import { ColorUtil } from "../../../../util/colors";

export interface ITemplateInputs extends IInstallationInput {
    rgbTweenProgress: number
}

function drawBar(ctx: CanvasRenderingContext2D, x: number, fromY: number, toY: number, width: number, gradient: CanvasGradient): void {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = gradient;
    ctx.moveTo(x, fromY);
    ctx.lineTo(x, toY);
    ctx.stroke();
}

export const draw = (timing: IAnimationTiming, config: IInstallationConfig, inputs: IInstallationInput, ctx: CanvasRenderingContext2D) => {
    /**
     * Clear the canvas for every frame
     */
    ctx.clearRect(0, 0, config.width, config.height)

    const data = config.mediaAnalyser.getByteFrequencyData()
    const space = config.width / data.length

    const gradient: CanvasGradient = ctx.createLinearGradient(0,config.height/2, config.width, config.height/2)
    gradient.addColorStop(0, ColorUtil.rgbaString(inputs.rgbaFrom))
    gradient.addColorStop(1, ColorUtil.rgbaString(inputs.rgbaTo))
    
    data.forEach((value, i)=> {
        drawBar(ctx, space * (i * 2), config.height - (value/255)*config.height, config.height, config.width / data.length, gradient)
    })
}