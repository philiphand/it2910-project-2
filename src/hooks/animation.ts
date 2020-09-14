import React, { useEffect } from "react"
import { IInstallationInput, AnimationFunction, IInstallationConfig } from "../interfaces/installations"

export interface IAnimationTiming {
    previous: DOMHighResTimeStamp,
    current: DOMHighResTimeStamp,
    delta: DOMHighResTimeStamp
}

export const useCanvasAnimation = (config: IInstallationConfig, inputs: IInstallationInput, running: boolean, draw: AnimationFunction, canvas: React.RefObject<HTMLCanvasElement>) => {
    const ctx = React.useRef<CanvasRenderingContext2D | null>()
    const requestRef = React.useRef<number>(-1)
    const previousFrameTime = React.useRef<DOMHighResTimeStamp>(-1)

    const animate:FrameRequestCallback = (time: DOMHighResTimeStamp) => {
        let time_delta = 0
        if (previousFrameTime.current > 0)
            time_delta = time - previousFrameTime.current

        let animationTiming: IAnimationTiming = {
            previous: previousFrameTime.current,
            current: time,
            delta: time_delta
        }

        previousFrameTime.current = time

        const ctx_instance = ctx.current
        if (ctx_instance)
            draw(animationTiming, config, inputs, ctx_instance)

        requestRef.current = requestAnimationFrame(animate)
    }
    
    useEffect(() => {
        let canvasElement = canvas.current
        if (canvasElement != null) {
            const context = canvasElement.getContext("2d")
            ctx.current = context

            if (context)
                scaleForRetina(canvasElement, context, config.width, config.height)

            if (running)
                requestRef.current = requestAnimationFrame(animate)
        }

        return () => cancelAnimationFrame(requestRef.current)
    }, [config, inputs, running, draw, canvas, animate]);
}

const scaleForRetina = (canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D, width: number, height: number) => {
    let ratio = window.devicePixelRatio
    canvasElement.width = width * ratio;
    canvasElement.height = height * ratio;
    canvasElement.style.width = `${width}px`;
    canvasElement.style.height = `${height}px`;
    ctx.scale(ratio, ratio);
}