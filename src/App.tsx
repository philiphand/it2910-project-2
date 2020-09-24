import React, { Component } from 'react';
import './App.css';
import { Carousel } from './components/carousel/carousel';
import { MediaAnalyser } from './components/nav/media-line/analyser';
import { MediaContext } from './mediaContext';
import { Navigation } from './components/nav/navigation';
import { DefaultInputs, InputContext } from './inputContext';
import { IInstallationInput } from './interfaces/installations';

interface IAappState {
  mediaAnalyser: MediaAnalyser | null,
  inputs: IInstallationInput
}

async function fetchPoems(numberOfPoems:number, lines:number) {
    const response = await fetch(`https://poetrydb.org/linecount,random/${lines};${numberOfPoems}/author,lines`)
    const poems = await response.json()

    if (poems.status) {
    throw new Error(poems.reason)
    }

    for (let i = 0; i < numberOfPoems; i++) {
    sessionStorage.setItem(i.toString(), JSON.stringify(poems[i]))
    }
}
fetchPoems(10, 4)

class App extends Component<any, IAappState> {
  constructor(props: any) {
    super(props)

    this.state = { 
      mediaAnalyser: null,
      inputs: DefaultInputs
    }
  }

  render = () => (
    <section id="app">
      <MediaContext.Provider value={this.state.mediaAnalyser}>
        <InputContext.Provider value={this.state.inputs}>
          <Carousel />

          <Navigation
            setMediaAnalyser={(mediaAnalyser) => this.setState({ ...this.state, mediaAnalyser }) }
            updateInputs={(inputs) => this.setState({...this.state, inputs})}
            inputs={this.state.inputs}>
          </Navigation>
        </InputContext.Provider>
      </MediaContext.Provider>
    </section>
  );
}

export default App
