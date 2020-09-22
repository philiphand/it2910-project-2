import React, { useContext, useEffect, useRef, useState } from "react";
import { MediaContext } from "../../mediaContext";
import { InputContext } from "../../inputContext";

import NextIcon from "../../img/next.svg";
import NextDisabledIcon from "../../img/nextDisabled.svg";

import { OscilliscopeInstallation } from "./installations/oscilliscope/oscilliscope";
import { Hypnotizer } from "./installations/hypnotizer/template";
import { FrequencyBallInstallation } from "./installations/frequencyball/frequency-ball";

import { Poetry } from "../poetry/poetry";

import "./carousel.css";

export const Carousel: React.FunctionComponent<any> = () => {
  const mediaAnalyser = useContext(MediaContext);
  const inputs = useContext(InputContext);
  const items = useRef<HTMLDivElement>(null);
  const [currentItem, setCurrentItem] = useState(0);
  const [animatedItems, setAnimatedItems] = useState([0]); // needed to animate multiple items during transitions

  const itemWidth = 1000;
  const itemHeight = 400;
  const transitionTimeMs = 1000;

  useEffect(() => {
    const node = items.current;

    if (!node) return;

    node.style.transform = `translate(-${itemWidth * currentItem}px)`;
  }, [currentItem]);

  const hasNext = () => {
    const length = items.current?.children.length;

    return length === undefined || currentItem < length - 1;
  };

  const hasPrevious = () => currentItem > 0;

  const handleNext = () => {
    if (hasNext()) {
      const nextItem = currentItem + 1;

      setCurrentItem(nextItem);
      setAnimatedItems([nextItem, currentItem]);
      setTimeout(() => {
        setAnimatedItems([nextItem]);
      }, transitionTimeMs);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious()) {
      const prevItem = currentItem - 1;

      setCurrentItem(prevItem);
      setAnimatedItems([prevItem, currentItem]);
      setTimeout(() => {
        setAnimatedItems([prevItem]);
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
        src={hasPrevious() ? NextIcon : NextDisabledIcon}
        onClick={handlePrevious}
        alt={"Previous item"}
        width={24}
        height={24}
      />

      <div className="view-port">
        <div className="items" ref={items}>
          <OscilliscopeInstallation
            config={{
              width: itemWidth,
              height: itemHeight,
              mediaAnalyser,
            }}
            inputs={inputs}
            running={animatedItems.includes(0)}
          />

          <FrequencyBallInstallation
            config={{
              width: itemWidth,
              height: itemHeight,
              mediaAnalyser,
            }}
            inputs={inputs}
            running={animatedItems.includes(1)}
          />

          <Hypnotizer
            config={{
              width: itemWidth,
              height: itemHeight,
              mediaAnalyser,
            }}
            inputs={inputs}
            running={animatedItems.includes(2)}
          />
        </div>
      </div>

      <img
        className="next-item"
        src={hasNext() ? NextIcon : NextDisabledIcon}
        onClick={handleNext}
        alt={"Next item"}
        width={24}
        height={24}
      />

      <Poetry lines="4"></Poetry>
    </div>
  );
};
