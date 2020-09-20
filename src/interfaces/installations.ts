import { MediaAnalyser } from "../components/nav/media-line/analyser";
import { IAnimationTiming } from "../hooks/animation";

export interface IInstallationProps {
    config: IInstallationConfig,
    inputs: IInstallationInput,
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
    mediaAnalyser: MediaAnalyser
}