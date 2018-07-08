import React/*, { Component }*/ from 'react';
import './App.css';
import Azavea from './Azavea';
import ToolbarExample from './ToolbarExample';
import SimpleExample from './SimpleExample';
import DraggableExample from './DraggableExample';

import DrawToolbarExample from './DrawToolbarExample';

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
