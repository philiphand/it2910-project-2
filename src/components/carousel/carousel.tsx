import React, { useContext, useEffect, useRef, useState } from "react";
import { MediaContext } from "../../mediaContext";
import { InputContext } from "../../inputContext";

import NextIcon from "../../img/next.svg";

import { OscilliscopeInstallation } from "./installations/oscilliscope/oscilliscope";
import { HypnotizerInstallation } from "./installations/hypnotizer/hypnotizer";
import { FrequencyBallInstallation } from "./installations/frequencyball/frequency-ball";
import { EqualizerBarsInstallation } from "./installations/equalizerbars/equalizerbars";
import { DotsInstallation } from "./installations/dots/dots";

import { Poetry, numberOfPoems } from "../poetry/poetry";

import "./carousel.css";

export const Carousel: React.FunctionComponent<any> = () => {
  const transitionTimeMs = 800;
  const startIndex = 1; // need to offset this by itemWidth in the css

  const mediaAnalyser = useContext(MediaContext);
  const inputs = useContext(InputContext);

  const items = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const [currentItem, setCurrentItem] = useState({ index: startIndex, quick: false });
  const [animatedItems, setAnimatedItems] = useState([startIndex]);
  const [viewportSize, setViewportSize] = useState({ width: 1000, height: 1000 })

  useEffect(() => {
    if (wrapper.current !== null) {
      setViewportSize({ width: wrapper.current.clientWidth, height: wrapper.current.clientHeight })
      window.addEventListener("resize", () => {
        if (wrapper.current !== null)
          setViewportSize({ width: wrapper.current.clientWidth, height: wrapper.current.clientHeight })
      })
    }
  }, [mediaAnalyser, setViewportSize])

  const [currentPoem, setCurrentPoem] = useState(0)

  useEffect(() => {
    const node = items.current;

    if (!node) return;

    node.style.transitionDuration = currentItem.quick ? "0.0s" : "0.8s";
    node.style.transform = `translate(-${viewportSize.width * currentItem.index}px)`;

    // handles resetting the carousel for the infinite effect
    if (currentItem.index === node.children.length - 1) {
      setTimeout(() => {
        setCurrentItem({ index: 1, quick: true });
        setAnimatedItems([1]);
      }, transitionTimeMs);
    } else if (currentItem.index === 0) {
      setTimeout(() => {
        setCurrentItem({
          index: node.children.length - 2,
          quick: true,
        });
        setAnimatedItems([node.children.length - 2]);
      }, transitionTimeMs);
    }
  }, [currentItem, viewportSize]);

  const hasNext = () => {
    const length = items.current?.children.length;

    return length === undefined || currentItem.index < length - 1;
  };

  const hasPrevious = () => currentItem.index > 0;

  const setRandomPoem = () => {
    if (sessionStorage.getItem("1") !== null) {
      let random:number = Math.floor(Math.random() * (numberOfPoems - 1))
      while (currentPoem === random) {
        random = Math.floor(Math.random() * (numberOfPoems - 1))
      }
      setCurrentPoem(random)
    }
  }

  const handleNext = () => {
    if (hasNext()) {
      const nextIndex = currentItem.index + 1;

      setRandomPoem()
      setCurrentItem({
        index: nextIndex,
        quick: false,
      });
      setAnimatedItems([nextIndex, currentItem.index]);

      // removes the previous item from being animated
      setTimeout(() => {
        setAnimatedItems([nextIndex]);
      }, transitionTimeMs);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious()) {
      const prevIndex = currentItem.index - 1;
      
      setRandomPoem()
      setCurrentItem({
        index: prevIndex,
        quick: false,
      });
      setAnimatedItems([prevIndex, currentItem.index]);

      // removes the previous item from being animated
      setTimeout(() => {
        setAnimatedItems([prevIndex]);
      }, transitionTimeMs);
    }
  };

  if (!mediaAnalyser) {
    return (
      <div className="waiting-for-media">Press play to see the animation</div>
    );
  }

  const installationConfig = {
    width: viewportSize.width,
    height: viewportSize.height,
    mediaAnalyser,
  }

  return (
    <div className="carousel" ref={wrapper}>
      <img
        className="previous-item"
        src={NextIcon}
        onClick={handlePrevious}
        alt={"Previous item"}
        width={24}
        height={24}
      />

      <div className="view-port">
        <div className="items" ref={items}>
          {/* duplicate */}
          <HypnotizerInstallation
            config={installationConfig}
            inputs={inputs}
            running={animatedItems.includes(0)}
          />
          {/* ----------*/}

          <OscilliscopeInstallation
            config={installationConfig}
            inputs={inputs}
            running={animatedItems.includes(1)}
          />

          <DotsInstallation
            config={installationConfig}
            inputs={inputs}
            running={animatedItems.includes(2)}
            ></DotsInstallation>

          <FrequencyBallInstallation
            config={installationConfig}
            inputs={inputs}
            running={animatedItems.includes(3)}
          />

          <EqualizerBarsInstallation
            config={installationConfig}
            inputs={inputs}
            running={animatedItems.includes(4)}
          />

          <HypnotizerInstallation
            config={installationConfig}
            inputs={inputs}
            running={animatedItems.includes(5)}
          />

          {/* duplicate */}
          <OscilliscopeInstallation
            config={installationConfig}
            inputs={inputs}
            running={animatedItems.includes(6)}
          />
          {/* ----------*/}
        </div>
      </div>

      <img
        className="next-item"
        src={NextIcon}
        onClick={handleNext}
        alt={"Next item"}
        width={24}
        height={24}
      />

      <Poetry poemNumber={currentPoem}></Poetry>
    </div>
  );
};
