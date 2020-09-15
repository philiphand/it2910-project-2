import React from "react";
import { MediaHandler } from "./components/media-line/media";

export const MediaContext = React.createContext<MediaHandler | null>(null);