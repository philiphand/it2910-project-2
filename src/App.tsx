import React, { Component } from 'react';
import './App.css';
import { Carousel } from './components/carousel/carousel';
import { MediaLine } from './components/media-line/media-line';
import { MediaHandler } from './components/media-line/media';
import { MediaContext } from './mediaContext';
import { Poetry } from './components/poetry/poetry';

interface IAappState {
  mediaHandler: MediaHandler | null
}

class App extends Component<any, IAappState> {
  constructor(props: any) {
    super(props)

    this.state = { mediaHandler: null }
  }

  render = () => (
    <div>
      <MediaContext.Provider value={this.state.mediaHandler}>
        <Carousel></Carousel>
      </MediaContext.Provider>
      
      <Poetry lines="4"></Poetry>
      <MediaLine updateMediaHandler={(mediaHandler) => this.setState({ mediaHandler }) }></MediaLine>
    </div>
  );
}

export default App
