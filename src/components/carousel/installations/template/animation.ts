import { IAnimationTiming } from "../../../../hooks/animation"
import { IInstallationConfig, IInstallationInput } from "../../../../interfaces/installations"

export interface ITemplateInputs extends IInstallationInput {
    rgbTweenProgress: number
}

export const draw = (timing: IAnimationTiming, config: IInstallationConfig, inputs: IInstallationInput, ctx: CanvasRenderingContext2D) => {
    const center = {
        x: config.width/2,
        y: config.height/2
    }
    
    /**
     * Clear the canvas for every frame
     */
    ctx.clearRect(0, 0, config.width, config.height)

    /**
     * Do one full turn every three seconds
     */
    let rotateBy = (timing.delta)/3000

    /**
     * Move to the center of the canvas
     * Rotate the context by the specified amount
     * Move back to the upper left corner before drawing
     */
    ctx.translate(center.x, center.y)
    ctx.rotate(rotateBy*Math.PI)
    ctx.translate(-center.x, -center.y)

    /**
     * Draw from the top left to the bottom right
     * This is in relation to the rotated context, naturally
     */
    ctx.beginPath()
        ctx.moveTo(config.width/4,config.height/4)
        /**
         * Moves to here:
         * |------------------|
         * |                  |
         * |    x             |
         * |                  |
         * |                  |
         * |                  |
         * |------------------|
         */

        ctx.lineTo((config.width/4)*3, (config.height/4)*3)
        /**
         * Draws line between points:
         * |------------------|
         * |                  |
         * |    x             |
         * |                  |
         * |            x     |
         * |                  |
         * |------------------|
         */
    ctx.closePath()

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.stroke()
    
    /**
     * OPTIONAL
     * Use the media handler from the config to fetch data about the current track
     * if needed. See oscilliscope for an example.
     */
    config.mediaAnalyser.getByteFrequencyData()
}