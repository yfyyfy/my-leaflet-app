import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Draggable from 'react-draggable';

export default class DraggableExample extends Component {
  state = {
    lat: 34,
    lng: 136,
    zoom: 6
  }

  leafletMap() {
    return this.refs.map.leafletElement;
  }

  // *Experimental* syntax.
  // Otherwise, bind this to the function in the constructor
  // this.handleStart = this.handleStart.bind(this);
  // See. https://reactjs.org/docs/handling-events.html
  handleStart = () => {
    this.leafletMap().dragging.disable();
  }

  handleStop = () => {
    this.leafletMap().dragging.enable();
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map ref="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Draggable
          // handle=".handle"
          defaultPosition={{x: 0, y: 0}}
          position={null}
          onStart={this.handleStart}
          // onDrag={this.handleDrag}
          onStop={this.handleStop}>
          <div
            style={{
              zIndex: 700,
              position: 'absolute',
              backgroundColor: 'white'
            }}>
            <div className="handle">Set 'handle=".handle"' as the Draggable attribute to drag from here</div>
            <div>This readme is really dragging on...</div>
          </div>
        </Draggable>
      </Map>
    );
  }
}
