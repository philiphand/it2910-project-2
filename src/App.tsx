import React, { Component } from 'react';
import './App.css';
import { Carousel } from './components/carousel/carousel';
import { MediaLine } from './components/media-line/media-line';
import { MediaHandler } from './components/media-line/media';
import { MediaContext } from './mediaContext';

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
      <span>It works!</span>
      <MediaContext.Provider value={this.state.mediaHandler}>
        <Carousel></Carousel>
      </MediaContext.Provider>
      
      <span>Hello</span>
      <MediaLine updateMediaHandler={(mediaHandler) => this.setState({ mediaHandler }) }></MediaLine>
    </div>
  );
}

export default App
