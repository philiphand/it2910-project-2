import { IAnimationTiming } from "../../../../hooks/animation"
import { IInstallationConfig, IInstallationInput } from "../../../../interfaces/installations"

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
    gradient.addColorStop(0, "rgba(0,163,249,0)")
    gradient.addColorStop(0.1, "rgba(0,163,249,.9)")
    gradient.addColorStop(0.9, "rgba(0,249,109,.9)")
    gradient.addColorStop(1, "rgba(0,249,109,0)")

    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API#Creating_a_waveformoscilloscope
     */
    const data = config.mediaAnalyser.getByteTimeDomainData()

    ctx.lineWidth = 2
    ctx.strokeStyle = gradient
    ctx.beginPath()

    var sliceWidth = config.width * 1.0 / config.mediaAnalyser.bufferLength;
    var x = 0;

    for(var i = 0; i < config.mediaAnalyser.bufferLength; i++) {
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