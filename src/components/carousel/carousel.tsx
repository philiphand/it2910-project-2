import React, { useContext, useEffect, useRef, useState } from "react";
import { MediaContext } from "../../mediaContext";
import { InputContext } from "../../inputContext";

import NextIcon from "../../img/next.svg";

import { OscilliscopeInstallation } from "./installations/oscilliscope/oscilliscope";
import { HypnotizerInstallation } from "./installations/hypnotizer/template";
import { FrequencyBallInstallation } from "./installations/frequencyball/frequency-ball";
import { EqualizerBarsInstallation } from "./installations/equalizerbars/equalizerbars";

import { Poetry } from "../poetry/poetry";

import "./carousel.css";

export const Carousel: React.FunctionComponent<any> = () => {
  const itemWidth = 1000;
  const itemHeight = 400;
  const transitionTimeMs = 800;
  const startIndex = 1; // need to offset this by itemWidth in the css

  const mediaAnalyser = useContext(MediaContext);
  const inputs = useContext(InputContext);
  const items = useRef<HTMLDivElement>(null);
  const [currentItem, setCurrentItem] = useState({
    index: startIndex,
    quick: false,
  });
  const [animatedItems, setAnimatedItems] = useState([startIndex]);
  const [currentPoem, setCurrentPoem] = useState(0)

  useEffect(() => {
    const node = items.current;

    if (!node) return;

    node.style.transitionDuration = currentItem.quick ? "0.0s" : "0.8s";
    node.style.transform = `translate(-${itemWidth * currentItem.index}px)`;

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
  }, [currentItem]);

  const hasNext = () => {
    const length = items.current?.children.length;

    return length === undefined || currentItem.index < length - 1;
  };

  const hasPrevious = () => currentItem.index > 0;

  const setRandomPoem = () => {
    
    let random:number = Math.floor(Math.random() * 29)
    while (currentPoem === random) {
      random = Math.floor(Math.random() * 29)
    }
    setCurrentPoem(random)
  }

  const handleNext = () => {
    if (hasNext()) {
      const nextIndex = currentItem.index + 1;
      setRandomPoem()
      console.log(currentItem.index)

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
      console.log(currentItem.index)

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

  return (
    <div className="carousel">
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
            config={{
              width: itemWidth,
              height: itemHeight,
              mediaAnalyser,
            }}
            inputs={inputs}
            running={animatedItems.includes(0)}
          />
          {/* ----------*/}

          <OscilliscopeInstallation
            config={{
              width: itemWidth,
              height: itemHeight,
              mediaAnalyser,
            }}
            inputs={inputs}
            running={animatedItems.includes(1)}
          />

          <FrequencyBallInstallation
            config={{
              width: itemWidth,
              height: itemHeight,
              mediaAnalyser,
            }}
            inputs={inputs}
            running={animatedItems.includes(2)}
          />

          <EqualizerBarsInstallation
            config={{
              width: itemWidth,
              height: itemHeight,
              mediaAnalyser,
            }}
            inputs={inputs}
            running={animatedItems.includes(3)}
          />

          <HypnotizerInstallation
            config={{
              width: itemWidth,
              height: itemHeight,
              mediaAnalyser,
            }}
            inputs={inputs}
            running={animatedItems.includes(4)}
          />

          {/* duplicate */}
          <OscilliscopeInstallation
            config={{
              width: itemWidth,
              height: itemHeight,
              mediaAnalyser,
            }}
            inputs={inputs}
            running={animatedItems.includes(5)}
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
