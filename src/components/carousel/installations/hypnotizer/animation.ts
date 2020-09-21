import { IAnimationTiming } from "../../../../hooks/animation"
import { IInstallationConfig, IInstallationInput } from "../../../../interfaces/installations"
import { ColorUtil, IRgbaColor } from "../../../../util/colors"

//Radius of each circle to be drawn
let circles:number[] = [1]
let circleTimer:number = 0
let animationTimer = 0

function getRandomColor(from: IRgbaColor, to: IRgbaColor) {
   return ColorUtil.rgbaString(ColorUtil.rgbTween(from, to, Math.random(), 1));
}

function drawCircle(radius: number, color: string, ctx: CanvasRenderingContext2D, x:number, y:number) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}    

function drawCircles(timing: IAnimationTiming, config: IInstallationConfig, inputs: IInstallationInput, ctx: CanvasRenderingContext2D) {
    const center = {
        x: config.width/2,
        y: config.height/2
    }

    circleTimer += timing.delta
    for(let i = 0; i < circles.length; i++) {
        drawCircle(circles[i], getRandomColor(inputs.rgbaFrom, inputs.rgbaTo), ctx, center.x, center.y)
        circles[i] += timing.delta / 5

        //Stops drawing circle if it exceeds specified size
        if(circles[i] > config.width/8) {
            circles[i] = 0;
            circles.splice(i, 1)
        }

        //Adds new circle at a time interval
        if(circleTimer > 30) {
            circleTimer = 0
            circles.push(0)
        }
    }
}

export const draw = (timing: IAnimationTiming, config: IInstallationConfig, inputs: IInstallationInput, ctx: CanvasRenderingContext2D) => {
    animationTimer += 1
    if(animationTimer > 2) {
        animationTimer = 0

        ctx.clearRect(0, 0, config.width, config.height)

        let musicFrequency = config.mediaAnalyser.getByteFrequencyData()

        //Run animation when sound is playing
        for(let i = 0; i < musicFrequency.length; i++) {
            if (musicFrequency[i] !== 0) {
            }
            else if(circles.length > 1) {
                circles.shift()
            }
            drawCircles(timing, config, inputs, ctx)
            break
        }
    }
}