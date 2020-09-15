import React, { Component } from 'react';
import './App.css';
import { Carousel } from './components/carousel/carousel';

class App extends Component {
  render = () => (
    <div>
      <span>It works!</span>
      <Carousel></Carousel>
    </div>
  );
}

export default App
