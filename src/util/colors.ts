export interface IRgbaColor {
    r: number,
    g: number,
    b: number,
    a: number
}

export class ColorUtil {
    static rgbTween(from: IRgbaColor, to: IRgbaColor, progress: number, opacity = 0.8): IRgbaColor {
        let deltaR = Math.abs(from.r - to.r)
        let deltaG = Math.abs(from.g - to.g)
        let deltaB = Math.abs(from.b - to.b)

        let newR = from.r + deltaR*progress*(from.r - to.r < 0 ? 1 : -1)
        let newG = from.g + deltaG*progress*(from.g - to.g < 0 ? 1 : -1)
        let newB = from.b + deltaB*progress*(from.b - to.b < 0 ? 1 : -1)
        let newA = opacity

        return {
            r: newR,
            g: newG,
            b: newB,
            a: newA
        }
    }

    static rgbTweenString(from: IRgbaColor, to: IRgbaColor, progress: number, opacity: number): string {
        let tween = this.rgbTween(from, to, progress, opacity)
        return this.rgbaString(tween)
    }

    static rgbaString(color: IRgbaColor): string {
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    }
}