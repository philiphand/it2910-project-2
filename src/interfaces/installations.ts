import { MediaHandler } from "../components/media-line/media";

export interface IInstallationProps {
    width: number,
    height: number,
    inputs: IInstallationInput,
    draw: AnimationFunction,
    running: boolean
}

export type AnimationFunction = (inputs: IInstallationInput, ctx: CanvasRenderingContext2D) => void

export interface IInstallationInput {
    mediaHandler: MediaHandler
}