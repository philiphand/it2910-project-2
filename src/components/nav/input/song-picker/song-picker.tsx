import React from 'react'

import './song-picker.css'

export interface ISongPickerProps {
    song: string,
    updateSong: (song: string) => void
}

const songs = [
    '/media/Back To The Future Jellyfish - NoMBe.mp3',
    '/media/Dreams (2004 Remaster).mp3',
    '/media/Lofi Mallet - Kwon.mp3',
    '/media/Messiah (by Handel) - Handel.mp3',
    '/media/Toccata in D minor (by Bach) - Bach.mp3',
]

export const SongPicker: React.FunctionComponent<ISongPickerProps> = ({ song, updateSong }) => {
    return (
        <div className='song-picker'>
            <select name='songs' id='songs' defaultValue={song} onChange={(e) => updateSong(e.target.value)}>
                {songs.map(
                    (song, i) => <option value={song} key={i}>{song.replace(/^.+\/(.+)\.\S+$/, '$1')}</option>
                )}
            </select>
        </div>)
}