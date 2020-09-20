import React, { Component } from 'react';
import './App.css';
import { Carousel } from './components/carousel/carousel';
import { MediaAnalyser } from './components/nav/media-line/analyser';
import { MediaContext } from './mediaContext';
import { Navigation } from './components/nav/navigation';

interface IAappState {
  mediaAnalyser: MediaAnalyser | null
}

class App extends Component<any, IAappState> {
  constructor(props: any) {
    super(props)

    this.state = { 
      mediaAnalyser: null
    }
  }

  render = () => (
    <section id="app">
      <MediaContext.Provider value={this.state.mediaAnalyser}>
        <Carousel></Carousel>

        <Navigation
          setMediaAnalyser={(mediaAnalyser) => this.setState({ mediaAnalyser }) }>
        </Navigation>
      </MediaContext.Provider>
    </section>
  );
}

export default App
