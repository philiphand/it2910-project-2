import { IInstallationInput } from "../../../../interfaces/installations"

export const templateDraw = (inputs: IInstallationInput, ctx: CanvasRenderingContext2D) => {
    console.log(inputs.mediaHandler.getByteFrequencyData())

    ctx.clearRect(0,0,1000,1000)
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(300, 150)
    ctx.stroke()
}