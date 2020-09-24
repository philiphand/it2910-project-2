import React from "react";
import { IInstallationInput } from "./interfaces/installations";

function getComplexity() {
    const storedValue = localStorage.getItem("complexity")
    return (typeof storedValue === "string" ? parseInt(storedValue) : 8)
}

export const DefaultInputs: IInstallationInput = {
    rgbaFrom: { r:0, g:163, b:249, a:0.9 },
    rgbaTo: { r:0, g:249, b:109, a:0.9 },
    complexity: getComplexity(),
    song: '/media/Dreams (2004 Remaster).mp3'
}

export const InputContext = React.createContext<IInstallationInput>(DefaultInputs);