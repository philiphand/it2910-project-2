import { MediaHandler } from "../components/media-line/media";
import { IAnimationTiming } from "../hooks/animation";

export interface IInstallationProps {
    config: IInstallationConfig,
    inputs: IInstallationInput,
    draw: AnimationFunction,
    running: boolean
}

export type AnimationFunction = (
    animationTiming: IAnimationTiming,
    config: IInstallationConfig,
    inputs: IInstallationInput, 
    ctx: CanvasRenderingContext2D) => void

export interface IInstallationInput {
    
}

export interface IInstallationConfig {
    width: number,
    height: number,
    mediaHandler: MediaHandler
}