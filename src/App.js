import React/*, { Component }*/ from 'react';
import styles from './App.css';
import Azavea from './examples/Azavea';
import ToolbarExample from './examples/ToolbarExample';
import SimpleExample from './examples/SimpleExample';
import DraggableExample from './examples/DraggableExample';
import DrawToolbarExample from './examples/DrawToolbarExample';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.maps = [];
    [...Array(4).keys()].forEach((i) => {
      this.maps.push(React.createRef());
    });
  }

  render() {
    return (
      <div>
        <div className={styles.parent}>
          <DrawToolbarExample ref={this.maps[0]} maps={this.maps} />
          <DraggableExample ref={this.maps[1]} maps={this.maps} />
          <ToolbarExample ref={this.maps[2]} maps={this.maps} />
          <SimpleExample ref={this.maps[3]} maps={this.maps} />
        </div>
        <Azavea />
      </div>
    );
  }
}

export default App;
