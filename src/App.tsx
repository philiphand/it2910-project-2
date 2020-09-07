import React from 'react';
import {Poetry} from './components/Poetry'
import './App.css';

function App() {
  return (
    <div className="App">
      <Poetry error="null" isLoaded={false} poem={[]} />
    </div>
  );
}

export default App;
