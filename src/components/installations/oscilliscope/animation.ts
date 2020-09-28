import { IAnimationTiming } from "../../../hooks/animation"
import { IInstallationConfig, IInstallationInput } from "../../../interfaces/installations"
import { ColorUtil } from "../../../util/colors"

export interface ITemplateInputs extends IInstallationInput {
    rgbTweenProgress: number
}

export const draw = (timing: IAnimationTiming, config: IInstallationConfig, inputs: IInstallationInput, ctx: CanvasRenderingContext2D) => {
    /**
     * Clear the canvas for every frame
     */
    ctx.clearRect(0, 0, config.width, config.height)

    /**
     * Create a color gradient
     */

    const gradient = ctx.createLinearGradient(0,config.height/2, config.width, config.height/2)
    gradient.addColorStop(0, ColorUtil.rgbaString({ ...inputs.rgbaFrom, a: 0 }))
    gradient.addColorStop(0.1, ColorUtil.rgbaString(inputs.rgbaFrom))
    gradient.addColorStop(0.9, ColorUtil.rgbaString(inputs.rgbaTo))
    gradient.addColorStop(1, ColorUtil.rgbaString({ ...inputs.rgbaTo, a: 0 }))

    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API#Creating_a_waveformoscilloscope
     */
    const data = config.mediaAnalyser.getByteTimeDomainData()

    ctx.lineWidth = 2
    ctx.strokeStyle = gradient
    ctx.beginPath()

    var sliceWidth = config.width * 1.0 / data.length;
    var x = 0;

    for(var i = 0; i < data.length; i++) {
        var v = data[i] / 128.0;
        var y = v * config.height/2;

        if(i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    ctx.lineTo(config.width, config.height/2);
    ctx.stroke();
    ctx.closePath();
}