import React from "react";
import { IInstallationInput } from "./interfaces/installations";

export const DefaultInputs: IInstallationInput = {
    rgbaFrom: { r:0, g:163, b:249, a:0.9 },
    rgbaTo: { r:0, g:249, b:109, a:0.9 },
    song: '/media/Dreams (2004 Remaster).mp3'
}

export const InputContext = React.createContext<IInstallationInput>(DefaultInputs);