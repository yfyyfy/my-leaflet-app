import React, { Component } from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import Draggable from 'react-draggable';
import ToolbarControl from '../controls/ToolbarControl';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw-toolbar/dist/leaflet.draw-toolbar.js';
// import 'leaflet-draw-toolbar';
import './DrawToolbarExample.css';

import { renderToString } from 'react-dom/server';
import IoMenu from 'react-icons/lib/io/android-menu';
import GoDatabase from 'react-icons/lib/go/database';
import IoPalette from 'react-icons/lib/io/android-color-palette';

export default class DrawToolbarExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
      isMainMenuVisible: false,
      isDataMenuVisible: false,
      isColorMenuVisible: {data1: true, data2: true}, // @todo
      isDataVisible: {data1: false, data2: false},
      numberOfGuests: 2
    };

    this.data = [
      {name: 'data1'},
      {name: 'data2'}
    ];

    this.data.map((dataName) => {
      // @todo
    });

    this.mainMenuAction = L.Toolbar2.Action.extend({
      options: {
        toolbarIcon: {
          html: renderToString(<IoMenu size={20}/>),
          tooltip: 'Show main menu'
        }
      },
      addHooks: () => {
        this.setState({isMainMenuVisible: !this.state.isMainMenuVisible});
      }
    });

    this.dataMenuAction = L.Toolbar2.Action.extend({
      options: {
        toolbarIcon: {
          html: renderToString(<GoDatabase size={20}/>),
          tooltip: 'Show data menu'
        }
      },
      addHooks: () => {
        this.setState({isDataMenuVisible: !this.state.isDataMenuVisible});
      }
    });

    this.colorMenuAction = L.Toolbar2.Action.extend({
      options: {
        toolbarIcon: {
          html: renderToString(<IoPalette size={20}/>),
          tooltip: 'Show color map'
        }
      },
      addHooks: () => {
        alert('color');
      }
    });
  }

  leafletMap() {
    return this._map.leafletElement;
  }

  featureGroup() {
    return this._editableFG.leafletElement;
  }

  _onMapReady = (map) => {
    this._map = map;
    if (!this._map) {return;}

    this.leafletMap().on('draw:created', (evt) => {
      let layer = evt.layer;
      this.featureGroup().addLayer(layer);
      // console.log(this.featureGroup().toGeoJSON());
      layer.on('click', (event) => {
        new L.Toolbar2.EditToolbar.Popup(event.latlng, {
          actions: [L.Toolbar2.EditAction.Popup.Edit, L.Toolbar2.EditAction.Popup.Delete]
        }).addTo(this.leafletMap(), layer);
      });
    });
  }

  _onFeatureGroupReady = (featureGroup) => {
    this._editableFG = featureGroup;
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const regexp = /([^[]*)\[([^[]*)\]/;
    const match = regexp.exec(name);
    if (match) {
      let [, objName, key] = match;
      key = JSON.parse(key.replace(/\'/g, '"'));
      this.setState({
        [objName]: Object.assign(this.state[objName], {[key]: value})
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  handleStart = () => {
    this.leafletMap().dragging.disable();
  }

  handleStop = () => {
    this.leafletMap().dragging.enable();
  }

  mainMenu() {
    return (
      <Draggable
        defaultPosition={{x: 0, y: 0}}
        position={null}
        onStart={this.handleStart}
        onStop={this.handleStop}>
        <div
          style={{
            zIndex: 700,
            position: "absolute",
            backgroundColor: "white"
          }}>
          <div>Main menu</div>
          <p>This is just an example to show the usage of the number field.</p>
          <label>
            Number of guests:
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          </label>
        </div>
      </Draggable>
    );  
  }

  dataMenuRow(dataName) {
    return (
      <tr key={dataName}>
        <td>
          <label>
            <input
              name={`isDataVisible['${dataName}']`}
              type="checkbox"
              checked={this.state.isDataVisible[dataName]}
              onChange={this.handleInputChange} />
            {dataName}
          </label>
        </td>
        <td><IoPalette/></td>
      </tr>
    );
  }

  dataMenu() {
    return (
      <Draggable
        defaultPosition={{x: 100, y: 100}}
        position={null}
        onStart={this.handleStart}
        onStop={this.handleStop}>
        <div
          style={{
            zIndex: 700,
            position: "absolute",
            backgroundColor: "white"
          }}>
          <div>Data menu</div>
          <table>
            <tbody>
              {Object.keys(this.state.isDataVisible).map((dataName) => {
                return this.dataMenuRow(dataName);
              })}
            </tbody>
          </table>
        </div>
      </Draggable>
    );  
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <Map ref={this._onMapReady} center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup ref={this._onFeatureGroupReady}>
        </FeatureGroup>
        <ToolbarControl position="topleft"
                        actions={[
                          this.mainMenuAction,
                          this.dataMenuAction,
                          this.colorMenuAction,
                          L.Toolbar2.DrawAction.Polyline
                        ]}
                        className="leaflet-draw-toolbar"/>
        {this.state.isMainMenuVisible && this.mainMenu()}
        {this.state.isDataMenuVisible && this.dataMenu()}
      </Map>
    );
  }
}
