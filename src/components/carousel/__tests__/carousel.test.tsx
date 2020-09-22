import React from "react";
import { render } from "@testing-library/react";
import { Carousel } from "../carousel";

// import { MediaContext } from "../../../mediaContext";
// import { DefaultInputs, InputContext } from "../../../inputContext";
// import { MediaAnalyser } from "../../nav/media-line/analyser";

describe("Carousel", () => {
  test("Renders text if no mediaAnalyser is set", () => {
    const { getByText } = render(<Carousel />);
    const linkElement = getByText(/Press play to see the animation/i);
    expect(linkElement).toBeInTheDocument();
  });

  //   test("Renders carousel if mediaAnalyser is set", () => {
  //     const wrapper = render(
  //       <MediaContext.Provider value={new MediaAnalyser()}>
  //         <InputContext.Provider value={DefaultInputs}>
  //           <Carousel />
  //         </InputContext.Provider>
  //       </MediaContext.Provider>
  //     );
  //   });
});
