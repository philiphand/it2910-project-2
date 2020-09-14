import React, { useEffect } from 'react'
import { MediaHandler } from './media'

export interface IMediaLineProps {
    updateMediaHandler: (handler: MediaHandler) => void
}

export const MediaLine:React.FunctionComponent<IMediaLineProps> = ({ updateMediaHandler }) => {
    const audioRef = React.createRef<HTMLAudioElement>()

    useEffect(() => {
        if (audioRef.current !== null) {
            let handler = new MediaHandler(audioRef.current)
            updateMediaHandler(handler)
        }
    }, [])

    return (<div>
        <audio ref={audioRef} src={"/media/Back To The Future Jellyfish - NoMBe.mp3"} controls />
    </div>)
}