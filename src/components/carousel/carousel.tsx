import React, { useState } from 'react'
import { draw } from './installations/template/animation'
import { MediaContext } from '../../mediaContext'
import { InstallationTemplate } from './installations/template/template'

export const Carousel:React.FunctionComponent<any> = () => {
    const [runInstallation, setRunInstallation] = useState(false)

    return (<div>
        <MediaContext.Consumer>
            {(mediaHandler) => {
                    if (mediaHandler) {
                        return (<InstallationTemplate 
                            config={{
                                width: 600,
                                height: 600,
                                mediaHandler
                            }}
                            inputs={{ }} 
                            running={runInstallation} 
                            draw={draw}></InstallationTemplate>
                        )
                    }
                    else {
                        return (<div>Loading...</div>)
                    }
                }
            }
        </MediaContext.Consumer>
        <button onClick={() => setRunInstallation(!runInstallation)}>KJØR</button>
    </div>)
}