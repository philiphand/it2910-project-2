import { IAnimationTiming } from "../../../../hooks/animation"
import { IInstallationConfig, IInstallationInput } from "../../../../interfaces/installations"

//Radius of each circle to be drawn
let circles:number[] = [1]
let timer:number = 0

//https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawCircle(radius: number, color: string, ctx: CanvasRenderingContext2D, x:number, y:number) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.stroke();
}    

export const draw = (timing: IAnimationTiming, config: IInstallationConfig, inputs: IInstallationInput, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, config.width, config.height)
    
    const center = {
        x: config.width/2,
        y: config.height/2
    }

    timer += timing.delta
    for(let i = 0; i < circles.length; i++) {
        drawCircle(circles[i], getRandomColor(), ctx, center.x, center.y)
        circles[i] += timing.delta / 5

        //Stops drawing circle if it is larger than canvas
        if(circles[i] > config.width) {
            circles[i] = 0;
            circles.splice(i, 1)
        }

        //Adds new circle at a time interval
        if(timer > 100) {
            timer = 0
            circles.push(0)
        }
    }
}