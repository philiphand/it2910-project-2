import React, { useEffect, useRef, useState } from 'react'
import { Carousel } from './carousel'

import './responsive-carousel.css'

export const ResponsiveCarousel: React.FunctionComponent = () => {
    const [viewportSize, setViewportSize] = useState({ width: 1280, height: 720 })

    const wrapper = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (wrapper.current !== null) {
          setViewportSize({ width: wrapper.current.clientWidth, height: wrapper.current.clientHeight })
          window.addEventListener("resize", () => {
            if (wrapper.current !== null)
              setViewportSize({ width: wrapper.current.clientWidth, height: wrapper.current.clientHeight })
          })
        }
      }, [setViewportSize])

    return (<div className="carousel-responsive-wrapper" ref={wrapper}>
        <Carousel viewport={viewportSize} />
    </div>)
}