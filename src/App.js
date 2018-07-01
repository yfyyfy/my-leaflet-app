import React/*, { Component }*/ from 'react';
import './App.css';
import Azavea from './Azavea';
import ToolbarExample from './ToolbarExample';
import SimpleExample from './SimpleExample';

const App = () => (
  <div>
    <ToolbarExample />
    <Azavea />
    <SimpleExample />
  </div>
);

export default App;
