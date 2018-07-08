import React/*, { Component }*/ from 'react';
import './App.css';
import Azavea from './examples/Azavea';
import ToolbarExample from './examples/ToolbarExample';
import SimpleExample from './examples/SimpleExample';
import DraggableExample from './examples/DraggableExample';
import DrawToolbarExample from './examples/DrawToolbarExample';

const App = () => (
  <div>
    <DrawToolbarExample />
    <DraggableExample />
    <ToolbarExample />
    <Azavea />
    <SimpleExample />
  </div>
);

export default App;
