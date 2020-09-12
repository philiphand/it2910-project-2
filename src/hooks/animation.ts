import React, { useEffect } from "react"
import { IInstallationInput, AnimationFunction } from "../interfaces/installations"

export const useCanvasAnimation = (inputs: IInstallationInput, running: boolean, draw: AnimationFunction, canvas: React.RefObject<HTMLCanvasElement>) => {
    const ctx = React.useRef<CanvasRenderingContext2D | null>()
    const requestRef = React.useRef<number>(-1)
    const previousFrameTime = React.useRef<DOMHighResTimeStamp>(-1)

    const animate:FrameRequestCallback = (time: DOMHighResTimeStamp) => {
        let time_delta = 0
        if (previousFrameTime.current > 0)
            time_delta = time - previousFrameTime.current

        previousFrameTime.current = time

        const ctx_instance = ctx.current
        if (ctx_instance)
            draw(inputs, ctx_instance)

        requestRef.current = requestAnimationFrame(animate)
    }
    
    useEffect(() => {
        ctx.current = canvas.current?.getContext("2d")
        if (running)
            requestRef.current = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(requestRef.current)
    }, [inputs, running, draw, canvas, animate]);
}