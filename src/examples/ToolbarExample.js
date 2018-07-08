import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import ToolbarControl from '../controls/ToolbarControl';
import L from 'leaflet';
import 'leaflet-toolbar';

// import { renderToString } from 'react-dom/server';
// import IoMenu from 'react-icons/lib/io/android-menu';
// import GoDatabase from 'react-icons/lib/go/database';
// import IoPalette from 'react-icons/lib/io/android-color-palette';

export default class ToolbarExample extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  };

  leafletMap() {
    return this.refs.map.leafletElement;
  }

  gotoSomewhereFunction(place, lat, lon, zoom) {
//     console.log(L.toolbarAction);
//     console.log(L.Control.Toolbar);
//     console.log(L.toolbar.control);
//     console.log(L.toolbar.control());
//     console.log(new window.LeafletToolbar.Control());
//     console.log(new window.LeafletToolbar.ToolbarAction());
//     console.log(L.Control.ToolbarAction); // undefined

    return L.Toolbar2.Action.extend({
      options: {
        toolbarIcon: {
          html: '&#9873;',
          // html: renderToString(<IoPalette size={20}/>),
          // html: '&#9776;',
          // html: '&#127912;',
          // html: '&#128396;',
          tooltip: `Go to ${place}`
        }
      },
      addHooks: () => {
        this.leafletMap().setView([lat, lon], zoom);
      }
    });
  }

  render() {
    const action1 = this.gotoSomewhereFunction('the Eiffel Tower', 48.85815, 2.29420, 19);
    const action2 = this.gotoSomewhereFunction('japan', 34, 136, 6);
    const position = [this.state.lat, this.state.lng];

    return (
      <Map ref="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ToolbarControl position="topright"   actions={[action1]}/>
        <ToolbarControl position="bottomleft" actions={[action1, action2]}/>
      </Map>
    );
  }
}
