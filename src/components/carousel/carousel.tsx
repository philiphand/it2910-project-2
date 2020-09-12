import React, { useState } from 'react'
import { InstallationTemplate } from './installations/template/installation_template'
import { templateDraw } from './installations/animations/template'

export const Carousel:React.FunctionComponent<any> = () => {
    const [runInstallation, setRunInstallation] = useState(false)

    return (<div>
        <InstallationTemplate width={400} height={400} inputs={{}} running={runInstallation} draw={templateDraw}></InstallationTemplate>
        <button onClick={() => setRunInstallation(!runInstallation)}>KJØR</button>
    </div>)
}