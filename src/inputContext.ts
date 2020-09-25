import React from "react";
import { IInstallationInput } from "./interfaces/installations";

function getComplexity() {
    const storedValue = localStorage.getItem("complexity")
    return (typeof storedValue === "string" ? parseInt(storedValue) : 8)
}

function getRgbaFrom() {
    const color = localStorage.getItem("rgbaFrom")
    return (typeof color === "string" ? JSON.parse(color) : { r:0, g:163, b:249, a:0.9 })
}

function getRgbaTo() {
    const color = localStorage.getItem("rgbaTo")
    return (typeof color === "string" ? JSON.parse(color) : { r:0, g:249, b:109, a:0.9 })
}

function getSong() {
    const song = localStorage.getItem("song")
    return (typeof song === "string" ? song : '/media/Dreams (2004 Remaster).mp3')
}

export const DefaultInputs: IInstallationInput = {
    rgbaFrom: getRgbaFrom(),
    rgbaTo: getRgbaTo(),
    complexity: getComplexity(),
    song: getSong()
}

export const InputContext = React.createContext<IInstallationInput>(DefaultInputs);