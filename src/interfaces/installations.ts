import { MediaAnalyser } from "../components/nav/media-line/analyser";
import { IAnimationTiming } from "../hooks/animation";
import { IRgbaColor } from "../util/colors";

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
    rgbaFrom: IRgbaColor,
    rgbaTo: IRgbaColor,
    complexity: number,
    song: string
}

export interface IInstallationConfig {
    width: number,
    height: number,
    mediaAnalyser: MediaAnalyser
}