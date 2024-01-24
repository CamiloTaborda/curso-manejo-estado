import React from 'react';
import { UseState } from './UseState.js'
import { useReducer } from './useReducer.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="Use State"/>
      <useReducer name="Use Reducer"/>
    </div>
  );
}

export default App;
