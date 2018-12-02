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
    const nRow = 2;
    const nColumn = 2;

    const rowStyle = nRow === 1 ? styles.row1 : styles.row2;
    const colStyle = nColumn === 1 ? styles.col1 : styles.col2;

    return (
      <div className={styles.wrapper}>
        <div className={`${styles.parent} ${colStyle} ${rowStyle}`}>
          <DrawToolbarExample ref={this.maps[0]} maps={this.maps} />
          {nColumn === 2 && <DraggableExample ref={this.maps[1]} maps={this.maps} />}
          {nRow === 2 && <ToolbarExample ref={this.maps[2]} maps={this.maps} />}
          {nRow === 2 && nColumn === 2 && <SimpleExample ref={this.maps[3]} maps={this.maps} />}
        </div>
        <div className={styles.orphan}>
          <Azavea />
        </div>
      </div>
    );
  }
}

export default App;
