import React, { useState } from 'react'
import { InstallationTemplate } from './installations/template/template'
import { templateDraw } from './installations/template/animation'
import { MediaContext } from '../../mediaContext'

export const Carousel:React.FunctionComponent<any> = () => {
    const [runInstallation, setRunInstallation] = useState(false)

    return (<div>
        <MediaContext.Consumer>
            {(mediaHandler) => {
                    if (mediaHandler) {
                        return (<InstallationTemplate 
                            width={400} 
                            height={400} 
                            inputs={{ mediaHandler }} 
                            running={runInstallation} 
                            draw={templateDraw}></InstallationTemplate>
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