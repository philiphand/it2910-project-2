import React from "react";
import { MediaAnalyser } from "./components/nav/media-line/analyser";

export const MediaContext = React.createContext<MediaAnalyser | null>(null);