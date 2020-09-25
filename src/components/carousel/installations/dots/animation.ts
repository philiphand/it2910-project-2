import { IAnimationTiming } from "../../../../hooks/animation"
import { IInstallationConfig, IInstallationInput } from "../../../../interfaces/installations"
import { ColorUtil, IRgbaColor } from "../../../../util/colors";

export interface ITemplateInputs extends IInstallationInput {
    rgbTweenProgress: number
}

const drawDot = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, gradient: CanvasGradient): void => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = gradient;
    ctx.fill();
}

export const draw = (timing: IAnimationTiming, config: IInstallationConfig, inputs: IInstallationInput, ctx: CanvasRenderingContext2D) => {
    const data = config.mediaAnalyser.getByteFrequencyData();    

    const gradient: CanvasGradient = ctx.createLinearGradient(0,config.height/2, config.width, config.height/2)
    gradient.addColorStop(0, ColorUtil.rgbaString({ ...inputs.rgbaFrom, a: 0 }))
    gradient.addColorStop(0.1, ColorUtil.rgbaString(inputs.rgbaFrom))
    gradient.addColorStop(0.9, ColorUtil.rgbaString(inputs.rgbaTo))
    gradient.addColorStop(1, ColorUtil.rgbaString({ ...inputs.rgbaTo, a: 0 }))

    /**
     * Clear the canvas for every frame
     */
    ctx.clearRect(0, 0, config.width, config.height)

    const numRows = 2 * ([16, 32, 64, 128, 256, 512, 1024].indexOf(data.length) + 1);
    const numCols = data.length / numRows;

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const radius = (data[i * j] / numRows) * 0.5;

            const x = j * (config.width / numCols) + ((800 / numCols) * 0.5);
            const y = i * (config.height / numRows) + ((config.height / numRows) / 2);

            drawDot(ctx, x, y, radius, gradient);
        }
    }
}