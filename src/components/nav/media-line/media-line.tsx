import React, { useState } from 'react'
import { IInstallationInput } from '../../../interfaces/installations'
import { MediaAnalyser } from './analyser'
import { MediaControls } from './media-controls/media-controls'


export interface IMediaLineProps {
    setMediaAnalyser: (handler: MediaAnalyser) => void
    inputs: IInstallationInput
}

export const MediaLine:React.FunctionComponent<IMediaLineProps> = ({ setMediaAnalyser, inputs}) => {
    const audioRef = React.createRef<HTMLAudioElement>()
    
    let [analyserSet, setAnalyserSet] = useState(false)
    let [playing, setPlaying] = useState(false)
    let [elapsed, setElapsed] = useState(0)
    let [duration, setDuration] = useState(100)

    const play = () => {
        if (audioRef.current) {
            if (!analyserSet) {
                setMediaAnalyser(new MediaAnalyser(audioRef.current))
                setAnalyserSet(true)
            }
                
            audioRef.current.play()
        }
    }

    const pause = () => audioRef.current?.pause()

    const metadataLoaded = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration)
        }
        if (playing) {
            play()
        }
    }

    return (<div>
        <audio 
            ref={audioRef} 
            src={inputs.song}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={() => setElapsed(audioRef.current?.currentTime || 0)}
            onLoadedMetadata={() => metadataLoaded()}
            style={{display: "hidden"}} />

        <MediaControls 
            playing={playing} 
            play={play}
            pause={pause}
            elapsed={elapsed}
            duration={duration} ></MediaControls> 
    </div>)
}